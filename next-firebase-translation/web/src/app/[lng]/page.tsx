import { useTranslation } from '../i18n'

export default async function Home({params}:{params:{lng:string}}) {
  console.log(params)
  const { t } = await useTranslation(params.lng,"translation")
  return (
    <div className='container'>
    </div>
  )
}
