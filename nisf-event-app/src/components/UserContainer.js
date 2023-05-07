import { useEffect } from "react"
import Wrapper from "../assets/wrappers/EventsContainer"
import { useAppContext } from "../context/appContext"
import Loading from "./Loading"
import User from "./User"



const UserContainer = () => {
    const { getUsers, users, isLoading } = useAppContext()

    useEffect(() => {
        getUsers()
    }, [])

    if (isLoading) {
        return (
            <div>
                <Loading center />
            </div>
        )
    }

    if(users.length === 0){
        return (
        <Wrapper>
            <h2>No users to display</h2>
        </Wrapper>
        )
    }

    return (
        <Wrapper>
            
            <div className="events">
                {users.map((user)=>{
                    return <User key={user._id}{...user}/>
                })}
            </div>

        </Wrapper>
    )
}

export default UserContainer