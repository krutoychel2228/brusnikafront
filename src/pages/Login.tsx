import XIcon from '../assets/x-symbol.svg'
import MailIcon from '../assets/mail.svg'
import KeyIcon from '../assets/key.svg'
import { FormEvent, useState } from 'react'

export default function Login() {

    const savedPassword = JSON.parse(localStorage.getItem('password') ?? 'null')
    const savedEmail = JSON.parse(localStorage.getItem('email') ?? 'null')

    const [email, setEmail] = useState(savedEmail ? savedEmail : '')
    const [password, setPassword] = useState(savedPassword ? savedPassword : '')
    const [passwordHidden, setPasswordHidden] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [wrongCredentials, setWrongCredentials] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const validateEmail = () => {
        if (!/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g.test(email)) {
            setEmailError(true)
            return false
        }
        return true
    }

    const validatePassword = () => {
        if (!/[a-z]/.test(password)) {
            setPasswordError('Пароль должен содержать маленькие буквы')
            return false
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError('Пароль должен содержать заглавные буквы')
            return false
        }
        if (password.length < 8) {
            setPasswordError('Пароль должен содержать как минимум 8 символов')
            return false
        }
        if (!/[0-9]/.test(password)) {
            setPasswordError('Пароль должен содержать цифры')
            return false
        }
        if (!/[$@!%*#?&]/.test(password)) {
            setPasswordError('Пароль должен содержать особые символы ($@!%*#?&)')
            return false
        }
        return true
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateEmail() || !validatePassword()) return

        if (rememberMe) {
            localStorage.setItem('password', JSON.stringify(password))
            localStorage.setItem('email', JSON.stringify(email))
        }

        alert(`Password: ${password}, email: ${email}`)
    }

    return (
        <article className="bg-cgrey h-[100vh]">
            <hr className="border-0" />
            <section className="bg-white w-[500px] h-[515px] mx-auto mt-24 rounded-[36px] border-black border-2">
                <div className="flex place-content-between py-5 pl-6 pr-4 select-none">
                    <p className="text-2xl inter">Авторизация</p>
                    <img className='w-4 mt-3' src={XIcon} />
                </div>
                <hr className='border-0 h-[1px] bg-clightergrey' />
                <form onSubmit={handleSubmit}>
                    <div className={`flex place-content-between mt-12 border-[1px] mx-4 py-5 rounded-md ${(emailError || wrongCredentials) ? 'border-cpalered' : 'border-clightergrey'}`}>
                        <img className='w-7 ml-5' src={MailIcon} />
                        <input className='mr-4 ml-3 block flex-grow outline-none' type="text" placeholder='E-mail' value={email} onChange={e => {
                            setWrongCredentials(false)
                            setEmailError(false)
                            setEmail(e.target.value)
                        }} />
                    </div>
                    {(emailError && !wrongCredentials) ? <p className='absolute text-cpalered ml-4 mt-1 inter'>Некорректный E-mail</p> : null}
                    <div className={`flex place-content-between mt-12 border-[1px] mx-4 py-5 rounded-md ${(passwordError || wrongCredentials) ? 'border-cpalered' : 'border-clightergrey'}`}>
                        <img className='w-7 ml-5' src={KeyIcon} />
                        <input className='ml-3 block flex-grow outline-none' type={passwordHidden ? 'password' : 'text'} placeholder='Пароль' value={password} onChange={e => {
                            setWrongCredentials(false)
                            setPasswordError('')
                            setPassword(e.target.value)
                        }} />
                        <div className='border-clightergrey border-l-[1px] mr-4 pl-2 cursor-pointer' onClick={() => setPasswordHidden(prev => !prev)}>Скрыть</div>
                    </div>
                    {(passwordError && !wrongCredentials) ? <p className='absolute text-cpalered ml-4 mt-1'>{passwordError}</p> : null}
                    {wrongCredentials ? <p className='absolute text-cpalered ml-4 mt-1 inter'>Указаны неверные данные</p> : null}

                    <div className='flex place-content-between mt-12 mx-4'>
                        <div className='flex gap-2'>
                            <input className='w-4' type="checkbox" defaultChecked={rememberMe} onClick={() => setRememberMe(prev => !prev)} />
                            <p className='text-lg inter'>Запомнить меня</p>
                        </div>
                        <p className='font-bold text-lg inter'>Забыли пароль?</p>
                    </div>
                    <div className='mx-4 mt-8'>
                        <button className='bg-cred w-full h-16 font-bold text-white text-xl rounded-xl inter'>
                            Войти
                        </button>
                    </div>
                </form>
            </section>
        </article>
    )
}