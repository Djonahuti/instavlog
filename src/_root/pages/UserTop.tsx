
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Models } from "appwrite";
import { Link } from "react-router-dom";

type UserTopProps = {
  user: Models.Document;
};

const UserTop = ({ user }: UserTopProps) => {
  return (
    <>
     <Link to={`/profile/${user.$id}`}>  
      <div className="flex space-x-4 px-4 py-2">
          <Avatar className="w-14 h-14 border-2 border-sky-200">
            {user.imageUrl && <AvatarImage src={user.imageUrl} alt={user.name} />}
            {!user.imageUrl && (
              <AvatarFallback className='font-semibold rounded-full'>
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        <span className="text-muted-foreground">@{user.username}</span>
      </div>
     </Link> 
    </>
  )
}

export default UserTop