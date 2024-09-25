import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrandLogo } from '../../assets/images'
import { Button, InputField, Loader } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store'
import { loginAction } from '../../store/reducersAndActions/authentication/auth.actions'
import { showErrorToast } from '../../utils/toast'
import { ROUTES } from '../../constants/routes'

function Login() {
    const [loginValues, setLoginValues] = useState<string>()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const { loading, user } = useAppSelector((state) => state.auth)

    const handleLogin = (value: string) => {
        if (!loginValues) {
            showErrorToast('Username Is Required')
            return
        }

        dispatch(loginAction({ loginUserName: value }))
    }

    useEffect(() => {
        if (user?.status === 4) {
            navigate(`${ROUTES.vertifyOTP}?userName=${loginValues}`)
        }
    }, [user?.status])

    return (
        <>
            {loading && <Loader />}
            <div className="h-screen w-screen flex justify-center items-center">
                <div
                    className="w-full flex flex-col lg:flex-row  md:w-3/4 md:h-3/4 h-full lg:w-[50%] lg:h-[50%] rounded-2xl overflow-hidden"
                    style={{ boxShadow: '#0000000f 0px 0px 20px 13px' }}
                >
                    <div className=" w-full lg:w-2/5 h-2/5 lg:h-full bg-gray-200 flex justify-center items-center p-4">
                        <img
                            src={BrandLogo}
                            className="h-3/4 w-3/4 object-contain"
                        />
                    </div>
                    <div className=" w-full lg:w-[60%] h-2/5 lg:h-full bg-white p-5 pt-14 flex items-center flex-col gap-8">
                        <div className="flex flex-col gap-2 items-center">
                            <h1 className="text-4xl font-bold">Log In</h1>
                            <p className="text-sm text-gray-600">
                                Log-in with your registered Username
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 w-4/5">
                            <InputField
                                onSubmit={() => handleLogin(loginValues || '')}
                                placeholder="Enter your Username"
                                label="Username"
                                value={loginValues}
                                onChange={(v) => setLoginValues(v)}
                                width={'100%'}
                            />
                        </div>
                        <div className="w-4/5 flex flex-col items-center gap-2">
                            <Button
                                onClick={() => handleLogin(loginValues || '')}
                                title="Send OTP"
                                width={'100%'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
