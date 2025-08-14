import React, {useState} from "react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birth: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("모든 필드를 입력해주세요");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지않습니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5173/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          birth: form.birth,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("회원가입 성공");
      } else {
        alert(data.message || "회원가입 실패");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };

  return (
    <div className="flex justify-center h-90">
      <div className="content-center border p-4 m-6 rounded-lg">
        <header className="flex justify-center p-4 text-2xl font-bold ">회원가입해라</header>
        <div className="flex flex-col gap-1 w-60">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-1 focus:outline-none"
            placeholder="名前"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-1 focus:outline-none"
            placeholder="メール"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border rounded px-1 focus:outline-none"
            placeholder="パスワード"
          />
          <input
            type="password"
            name="confirmpassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="border rounded px-1 focus:outline-none"
            placeholder="*パスワード*"
          />
          <input
            name="birth"
            value={form.birth}
            onChange={handleChange}
            className="border rounded px-1 focus:outline-none"
            placeholder="生-年-月-日"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSignup}
            className=" place-items-end cursor-pointer border px-2 py-1  rounded bg-gray-200"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
