import { AiOutlineDotChart } from 'react-icons/ai'
import { AiOutlineProfile } from 'react-icons/ai'
import { AiOutlineCalendar } from 'react-icons/ai'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi'

const links = [

    { id: 1, text: 'stats', path: '/', icon: <AiOutlineDotChart /> },
    { id: 2, text: 'all events', path: '/all-events', icon: <AiOutlineCalendar /> },
    { id: 3, text: 'add event', path: '/add-event', icon: <AiOutlineFileAdd /> },
    { id: 4, text: 'profile', path: '/profile', icon: <AiOutlineProfile /> },
    // { id: 5, text: 'users', path: '/users', icon: <HiOutlineUsers /> },

]

export default links;