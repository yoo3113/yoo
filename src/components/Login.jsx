import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5173/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("서버 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center h-[500px]">
      <div className="flex justify-center flex-col space-y-4 p-6 w-full max-w-md border m-10 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="w-20">아이디</span>
          <input
            className="border"
            placeholder="id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="text-sm px-2 py-1 border bg-gray-400 cursor-pointer">
            중복확인
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20">비밀번호</span>
          <input
            className="border"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          <span>로그인</span>
        </button>
        <div className="flex justify-end text-sm cursor-pointer gap-2">
          <span className="flex right">회원가입</span>
          <span>|</span>

          <span>비밀번호 잊어버렸을때</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
