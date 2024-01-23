

import { onMounted, ref } from 'vue'
import liff from '@line/liff'

export type Status = 'signin' | 'inited';

export const useLine = () => {
  const liffObject = ref<any | null>(null)
  const status = ref<Status>('signin')

  //assertData(liffObject)
  //liffObject

  const login = () => {
    liffObject.value.login()
  }

  const logout = () => {
   liffObject.value.logout()
  }
  
  onMounted(() => {
    if (status.value === 'inited') return

    liff
      .init({ liffId: '2002698449-1ZY4qJEx',
      withLoginOnExternalBrowser: true,})
      .then(() => {
        liffObject.value = liff
        if (liff.isLoggedIn()) status.value = 'inited'
    
      })
      .catch((err: any) => {
        console.error({ err })
      })

      
  })

  return {
    liffObject,
    status,
    login,
    logout,
  }
}


