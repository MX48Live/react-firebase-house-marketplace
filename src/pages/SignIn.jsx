import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if (userCredential.user) {
          navigate('/')
          toast.success('Sign-In Success')
        } 
    } catch (error) {
      toast.error('Bad User Credential')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome Back!
          </p>
          <main>
            <form onSubmit={onSubmit}>
              <input type="email" className="emailInput" placeholder='Email' id="email" value={email} onChange={onChange} />
              <div className="passwordInputDiv">
                <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder='Password' id="password" value={password} onChange={onChange} />

                <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={() => setShowPassword(!showPassword)}/>
              </div>

              <Link to="/forgot-password" className='forgotPasswordLink'>Forgot Password</Link>

              <div className="signInBar">
                <p className="signInText">
                  Sign In
                </p>
                <button className="signInButton">
                  <ArrowRightIcon fill="#FFFFFF" width="34px" height="35px" />
                </button>
              </div>
            </form>

            {/* Google OAuth */}

            <Link to="/sign-up" className='registerLink'>Sign Up</Link>
          </main>
        </header>
      </div>
    </>
  )
}

export default SignIn
