// import { getHonoClient } from '@/lib/client'
// import type { CreateUser } from '@OtherSide/validation'

// export async function createUser(data: CreateUser) {
//   const hc = await getHonoClient()
//   const deviceLanguage = getLocales()[0].languageCode ?? 'vi'
//   const deviceCurrency = getLocales()[0]?.currencyCode ?? 'VND'

//   const res = await hc.v1.users.$post({
//     json: data,
//     header: {
//       'x-device-language': deviceLanguage,
//       'x-device-currency': deviceCurrency,
//     },
//   })

//   if (!res.ok) {
//     return null
//   }

//   return res.json()
// }

export async function createUser(data: any) {
  return data;
}
