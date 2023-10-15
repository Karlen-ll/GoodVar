import { ref, readonly } from 'vue'

const USERS = ['Ваша Светлость', 'Ваше Высочество', 'Ваше Сиятельство', 'Ваше Благородие']

// Global reference. Because outside of `export`
const user = ref(USERS[0])

export function useUser() {
  const changeUser = () => {
    let index = USERS.indexOf(user.value)

    if (index === USERS.length - 1) index = 0
    else index++

    user.value = USERS[index]
  }

  return {
    user: readonly(user),
    changeUser,
  }
}
