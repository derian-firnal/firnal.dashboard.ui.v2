import { useNavigate } from 'react-router-dom';
//import Pattern3 from '../assets/images/pattern_3.png';
import { loginUser } from '../services/AuthService';
import { useEffect, useState } from 'react';

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedUsername');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const onLoginSuccess = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.setItem('jwtToken', user.jwtToken);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log('Login successful:', response);

      onLoginSuccess(response.user);

      if (rememberMe) {
        localStorage.setItem('rememberedUsername', email);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      setTimeout(() => {
        navigate('/');
      }, 0);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        //backgroundImage: `url(${Pattern3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#4880FF'
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-5">
            Login to Account
          </h2>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@name.com"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-[#F1F4F9] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-opacity-60 text-brand-primary-black hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-[#F1F4F9] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-900">
                Remember password
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
