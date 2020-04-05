from flask import Flask, render_template, jsonify, request
homepage = Flask(__name__)

from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.dbhomework                     # 'dbhomework'라는 이름의 db를 만듭니다.

## HTML을 주는 부분
@homepage.route('/')
def home():
    return render_template('index.html')

## API 역할을 하는 부분
@homepage.route('/receipt', methods=['POST'])
def write_order():
    # 1. 클라이언트가 준 #inputEmail3, #inputState, #inputPassword3,  #inputPassword4
    name_receive = request.form['name_give']
    cnt_receive = request.form['cnt_give']
    address_receive = request.form['address_give']
    phone_receive = request.form['phone_give']

    # DB에 삽입할 order 만들기
    order = {'name': name_receive,
             'cnt': cnt_receive,
             'address': address_receive,
             'phone': phone_receive
             }
    db.receipt.insert_one(order)
    return jsonify({'result':'success', 'msg': '주문이 성공적으로 완료되었습니다.'})

    # 2. DB에 정보 삽입하기
    # 3. 성공 여부 & 성공 메시지 반환하기
	# return jsonify({'result':'success', 'msg': '이 요청은 POST!'})


@homepage.route('/receipt', methods=['GET'])
def read_order():
    orders = list(db.receipt.find({}, {'_id': 0}))
    return jsonify({'result':'success', 'orders': orders})


if __name__ == '__main__':
    homepage.run('0.0.0.0', port=5000, debug=True)