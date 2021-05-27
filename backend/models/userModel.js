import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// this method compares the plain text password with the encrypted password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}

// it is actually required to be encrypted at the controller but this piece of middleware helps us do the task easier.
// this is pre middleware to the save operation  in database 
// this works only for create data, not for update
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})

const User = mongoose.model('User', userSchema)

export default User
