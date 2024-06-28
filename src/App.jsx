import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [name, setName] = useState("");
  const [numberId, setNumberId] = useState("");
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");
  const [birth, setBirth] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // State สำหรับข้อความแสดงข้อผิดพลาด
  const [nameError, setNameError] = useState("");
  const [numberIdError, setNumberIdError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [birthError , setBirthError] = useState("")


  // state สำหรับดูข้อมูล
  const [detail , setDetail] = useState(false)

 

  useEffect(() => {
    if (
      name !== "" &&
      numberId.replace(/-/g, "").length === 13 &&
      gender !== "" &&
      (gender !== "อื่นๆ" || otherGender !== "")
    ) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [name, numberId, gender,birth, otherGender]);

  const handleNameChange = (event) => {
    const input = event.target.value;
    const regex = /^[ก-๏\sA-Za-z]+$/;
    if (regex.test(input) || input === "") {
      setName(input);
      setNameError(""); 
    } else {
      setNameError("ชื่อ-นามสกุลไม่ถูกต้อง");
    }
  };

  const handleIdChange = (event) => {
    let input = event.target.value;
    input = input.replace(/\D/g, "");
    if (input.length <= 13) {
      const formattedInput = input
        .replace(
          /(\d{1})(\d{0,4})(\d{0,5})(\d{0,2})(\d{0,1})/,
          "$1-$2-$3-$4-$5"
        )
        .replace(/-*$/, "");
      setNumberId(formattedInput);
      setNumberIdError(""); 
    }
  };

  const handleOtherGender = (event) => {
    setGender(event.target.value);
    if (event.target.value !== "อื่นๆ") {
      setOtherGender("");
    }
  };

  const handleReset = () => {
    setName("");
    setNumberId("");
    setGender("");
    setBirth("")
    setOtherGender("");
    setFormCompleted(false);
    setNameError("");
    setNumberIdError("");
    setGenderError("");
    setBirthError("")
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    handleReset();
  };

  const handleSubmit = () => {
    let valid = true;
    if (name === "") {
      setNameError("กรุณาระบุ ชื่อ-นามสกุล");
      valid = false;
    } else {
      setNameError("");
    }
    if (numberId.replace(/-/g, "").length !== 13) {
      setNumberIdError("กรุณาระบุ เลขบัตรประจำตัวประชาชน");
      valid = false;
    } else {
      setNumberIdError("");
    }
    if (gender === "") {
      setGenderError("กรุณาระบุ เพศของคุณ");
      valid = false;
    } else {
      setGenderError("");
    }
    if (birth === "") {
      setBirthError("กรุณาระบุ วันเกิดของคุณ");
      valid = false;
    } else {
      setBirthError("");
    }

    if (valid) {
      handleConfirm();
    }
  };

  const showDetail = () => {
    setDetail(true)
  }

  const formatThaiDate = (dateString) => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; 

    return `${day} ${month} ${year}`;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };


  const exitToHome = () => {
    setDetail(false)
    setShowConfirmation(false)
    handleReset()
  }
  

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col justify-center border shadow-xl p-12 w-full max-w-md bg-white ">
          <div className="flex flex-col items-center">
            <p>แบบฟอร์มเข้ารับบริการฉีดวัคซีน</p>
            <p>1 มิถุนายน พ.ศ.2566 – 31 สิงหาคม พ.ศ.2566</p>
          </div>
          <div className="flex flex-col justify-center space-y-3">
            <div className="flex flex-col p">
              <label className="mt-2">ชื่อ-นามสกุล</label>
              <input
                className="border rounded-md focus:outline-none px-2"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && (
                <span className="text-red-500 text-sm">{nameError}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mt-2">เลขบัตรประจำตัวประชาชน</label>
              <input
                className="border rounded-md focus:outline-none px-2"
                type="text"
                value={numberId}
                onChange={handleIdChange}
              />
              {numberIdError && (
                <span className="text-red-500 text-sm">{numberIdError}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mt-2">เพศ</label>
              <select
                id="gender"
                name="gender"
                className="border"
                value={gender}
                onChange={handleOtherGender}
              >
                <option value="">กรุณาเลือก</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
              {genderError && (
                <span className="text-red-500 text-sm">{genderError}</span>
              )}
              {gender === "อื่นๆ" && (
                <div className="flex flex-col mt-2">
                  <label htmlFor="otherGender">โปรดระบุ</label>
                  <input
                    id="otherGender"
                    className="border rounded-md focus:outline-none px-2"
                    type="text"
                    value={otherGender}
                    onChange={(e) => setOtherGender(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mt-2">วัน/เดือน/ปี เกิด</label>
              <input
                className="border focus:outline-none rounded-md px-1"
                type="date"
                value={birth}
                max={new Date().toISOString().split("T")[0]}
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={(e) => setBirth(e.target.value)}
              />
              {birthError && (
                <span className="text-red-500 text-sm">{birthError}</span>
              )}
            </div>
          </div>
          <div className="mt-5 flex justify-center gap-2">
            <button
              className="border rounded-lg px-3 py-1 bg-green-500"
              onClick={handleSubmit}
            >
              ยืนยัน
            </button>
            <button
              className="border rounded-lg px-3 py-1 bg-red-500"
              onClick={handleReset}
            >
              คืนค่า
              {formCompleted}
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="mb-4">คุณต้องการยืนยันข้อมูลที่กรอกใช่หรือไม่?</p>
            <div className="flex justify-center gap-4">
              <button
                className="border rounded-lg px-3 py-1 bg-green-500"
                onClick={handleCloseConfirmation}
              >
                <p>ใช่</p>
              </button>
              <button
                className="border rounded-lg px-3 py-1 bg-red-500"
                onClick={showDetail}
              >
                ตรวจสอบ
              </button>
            </div>
          </div>
        </div>
      )}
      {detail === true ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg ">
            <div className="flex gap-x-3">
              <p>ชื่อ-สกุล :</p>
              <p>{name}</p>
            </div>
            <div className="flex gap-x-3">
              <p>เลขบัตรประชาชน :</p>
              <p>{numberId}</p>
            </div>
            <div className="flex gap-x-3">
              <p>เพศ :</p>
              <p>{gender}</p>
            </div>
            <div className="flex gap-x-2">
              <p>วัน เดือน ปี เกิด :</p>
              <p>
                {formatThaiDate(birth)} และคุณมีอายุ {calculateAge(birth)} ปี
              </p>
            </div>
            <div>
              {calculateAge(birth) <= 0 ||
              calculateAge(birth) <= 2 ||
              calculateAge(birth) >= 65 ? (
                <div className="text-green-500">สามารถเข้ารับบริการได้</div>
              ) : (
                <div className="text-red-500">ไม่สามารถเข้ารับบริการได้</div>
              )}
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="border rounded-lg px-3 py-1 bg-blue-500"
                onClick={exitToHome}
              >
                ย้อนกลับ
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;