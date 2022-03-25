import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const onLogout = () => {
    auth.signOut()
    navigate('/')
    toast.success('Signed Out')
  }

  const { name, email } = formData

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type='button' onClick={onLogout}>Logout</button>
      </header>
    </div>
  )
}

export default Profile
