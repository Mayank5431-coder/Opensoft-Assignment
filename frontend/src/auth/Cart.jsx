export default function Cart({username,email}){
  return(
    <div className="bg-gray-600 w-96 h-24 m-10 rounded-4xl">
      <div className="text-white p-2">
        username - {username}
      </div>
      <div className="text-white p-2">
        email - {email}
      </div>
    </div>
  )
}