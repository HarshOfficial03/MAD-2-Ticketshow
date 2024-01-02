
from email import encoders
import time
from flask import send_file
from Website import create_app
from Website.celery_worker import make_celery
from celery.schedules import crontab
from jinja2 import Template

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase


import csv

from Website.models import User,Confirmbooking,Venue,Show
# Read these from the config
SMPTP_SERVER_HOST = "localhost"
SMPTP_SERVER_PORT = 1025
SENDER_ADDRESS = "harsh@gmail.com"
SENDER_PASSWORD =""

# send email 
def send_email(to_address, subject, message,attachment_file=None):
    msg = MIMEMultipart()
    msg["From"] = SENDER_ADDRESS
    msg["To"] = to_address
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "html"))
    if attachment_file:
        with open (attachment_file,'rb') as attachment :
            part=MIMEBase("application","octet-stream")
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition",f"attachment; filename={attachment_file}",
        )  
        msg.attach(part)
        
    s = smtplib.SMTP(host=SMPTP_SERVER_HOST, port=SMPTP_SERVER_PORT)
    s.login(SENDER_ADDRESS, SENDER_PASSWORD)
    s.send_message(msg)
    s.quit()
    return True


    
app = create_app()



app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
    
)
celery = make_celery(app)

@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    
    # daily report every 10 sec email will be sent
    # sender.add_periodic_task(10.0, daily_remider_toemails.s(), name='add every 10')
    sender.add_periodic_task(
        crontab(hour=21, minute=9),
        daily_remider_toemails.s(),
    )
    
    # monthly report 
    # sender.add_periodic_task(20.0, monthly_user_report.s(), name='add every 20')
    
    sender.add_periodic_task(
        crontab(hour=21, minute=10),
        monthly_user_report.s(),
    )

# daily remider task
@celery.task()
def daily_remider_toemails():
    mails=[]
    user=User.query.filter_by(admin="False").all()
    for i in user:
        if not Confirmbooking.query.filter_by(email=i.email).first():
            mails.append(i.email)
    for i in mails:       
        send_email(i,subject="Hurry Up!!",message="Hey don't miss the amazing movies, book your tickets now.")
    # send_email("user22@gmail.com",subject="Hurry Up!!",message="Hey don't miss the amazing movies, book your tickets now.")
    return "Email will recieve shortly"

# monthly remider task
@celery.task()
def monthly_user_report():
    user=User.query.filter_by(admin="False").all()
    for i in user:
        if not Confirmbooking.query.filter_by(email=i.email).first():
            send_email(i.email,subject="Hurry Up!!",message="Hey don't miss the amazing movies, book your tickets now.")
        else:
            bookings=Confirmbooking.query.filter_by(email=i.email).all()
            a=''
            for i in bookings:
                a = i.overalltotal
                break
            template_path = 'Website/templates/user_report.html'
            with open(template_path) as f:
                template=Template(f.read())
                message=template.render(bookings=bookings,overall=a)
            send_email(i.email,subject="Monthly report of ticket show webapp",message=message)
    return "Email will recieve shortly"


@celery.task()
def export_csv_email(vid,email):
    time.sleep(5)
    venue=Venue.query.filter_by(id=vid).first()
    show=Show.query.filter_by(venue_id=vid).all()
    data=[["Venue_Name","Place","Venue_Capacity","Show_name","start timing","End timing","Tags","Ratings","Price","Tickets Left"]]
    for shows in show:
        data.append([venue.name,venue.place,venue.capacity,shows.name,shows.stimings,shows.etimings,shows.tags,shows.rating,shows.price,shows.quantity])
    csv_filename = f'Website/static/venue_{venue.id}_shows.csv'
    with open(csv_filename, 'w', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerows(data)
    # return send_file(csv_filename)
    send_email(to_address=email,subject="Exported CSV",message="This is your csv file of the requested venue and its shows",attachment_file=csv_filename)
    
@app.route('/exportcsv/<int:id>/<string:email>')
def exportjobs(id,email):

    a=export_csv_email.delay(id,email)
    return {"Status":"Done"}





if __name__ == "__main__":
    # daily_remider_toemails()
    app.run(debug=True, host="localhost", port=3000)
    
