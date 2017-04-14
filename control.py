from flask import Flask, jsonify, request
from BrickPi import *

application = Flask(__name__)

@application.route("/")
def hello():
  return "<h1 style='color:blue'>Hello There!</h1>"

motor1=PORT_B
motor2=PORT_C

def left(speed):
  BrickPi.MotorSpeed[motor1]=speed
  BrickPi.MotorSpeed[motor2]=-speed

def right(speed):
  BrickPi.MotorSpeed[motor1]=-speed
  BrickPi.MotorSpeed[motor2]=speed

def up(speed):
  BrickPi.MotorSpeed[motor1]=speed
  BrickPi.MotorSpeed[motor2]=speed

def down(speed):
  BrickPi.MotorSpeed[motor1]=-speed
  BrickPi.MotorSpeed[motor2]=-speed

@application.route("/robot",methods=['POST'])
def command():
  if not request.json:
    abort(400)
  move = request.json['move']
  speed = request.json['speed']
  speed=float(speed)

  BrickPiSetup()

  BrickPi.MotorEnable[motor1]=1
  BrickPi.MotorEnable[motor2]=1
  BrickPiSetupSensors()
  BrickPi.Timeout=2000
  BrickPiSetTimeout()

  if move=="L":
    left(speed)
  elif move=="R":
    right(speed)
  elif move=="U":
    up(speed)
  else:
    down(speed)

  BrickPiUpdateValues()
  
  return jsonify({'move': move})

if __name__ == "__main__":
  application.run(host='0.0.0.0')
