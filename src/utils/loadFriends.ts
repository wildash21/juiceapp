import type User from '@/types/User'

export default async function loadFriends(setFriends: (friends: User[]) => void) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    setFriends(await response.json())
}
