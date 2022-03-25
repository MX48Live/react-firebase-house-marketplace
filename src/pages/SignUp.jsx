import { useState } from 'react'
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formData
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')

    } catch (error) {
      console.log(error)
      toast.error('Something Went wrong')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Sign Up
          </p>
          <main>
            <form onSubmit={onSubmit}>
              <input type="text" className="nameInput" placeholder='Name' id="name" value={name} onChange={onChange} />
              <input type="email" className="emailInput" placeholder='Email' id="email" value={email} onChange={onChange} />
              <div className="passwordInputDiv">
                <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder='Password' id="password" value={password} onChange={onChange} />

                <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={() => setShowPassword(!showPassword)}/>
              </div>

              <Link to="/forgot-password" className='forgotPasswordLink'>Forgot Password</Link>

              <div className="signUpBar">
                <p className="signUpText">
                  Sign Up
                </p>
                <button className="signUpButton">
                  <ArrowRightIcon fill="#FFFFFF" width="34px" height="35px" />
                </button>
              </div>
            </form>

            {/* Google OAuth */}

            <Link to="/sign-In" className='registerLink'>Sign In</Link>
          </main>
        </header>
      </div>
    </>
  )
}

export default SignUp
