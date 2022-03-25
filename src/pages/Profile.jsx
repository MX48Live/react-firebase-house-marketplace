import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { updateDoc, doc } from 'firebase/firestore'

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false)

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

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // update firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
        toast.success('Updated Profile')
      }
    } catch (error) {
      toast.error('Could not update Profile detail')
    }
  }

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type='button' onClick={onLogout}>Logout</button>
      </header>
      <main>
        <div className="profileDetailHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails(!changeDetails)
          }}>{changeDetails ? 'Done' : 'Edit'}</p>
        </div>
        <div className="profileCard">
          <form >
            <input type="text" id="name" className={
              !changeDetails ? 'profileName' : 'profileNameActive'
            }
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

            <input type="text" id="email" className={
              !changeDetails ? 'profileEmail' : 'profileEmailActive'
            }
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />

          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile
