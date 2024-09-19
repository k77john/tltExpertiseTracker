import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BrandLogo } from '../../assets/images'
import { Button, Loader } from '../../components'
import OTPInput from '../../components/otpInput/OTPInput'
import { ROUTES } from '../../constants/routes'
import { LoginInputs } from '../../constants/types'
import { useAppDispatch, useAppSelector } from '../../store'
import {
    loginAction,
    verifyOtpAction,
} from '../../store/reducersAndActions/authentication/auth.actions'
import { showErrorToast } from '../../utils/toast'

function VerifyOTP() {
    const { loading, user } = useAppSelector((state) => state.auth)
    const [searchParams] = useSearchParams()
    const userName = searchParams.get('userName')
    const email = searchParams.get('email')

    const [otp, setOtp] = useState<string>()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleOtpChange = (newOtp: string) => {
        setOtp(newOtp)
    }

    const handleVerifyOtp = (value: LoginInputs) => {
        if (!otp) {
            showErrorToast('Please Enter OTP')
            return
        }
        dispatch(verifyOtpAction(value))
    }

    const handleLogin = (value: string) => {
        if (!userName) {
            showErrorToast('Username Is Required')
            return
        }

        dispatch(loginAction({ loginUserName: value }))
    }

    useEffect(() => {
        if (user?.status === 0) {
            navigate(ROUTES.dashBoard)
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
                            <h1 className="text-4xl font-bold">Verify OTP</h1>
                            <p className="text-sm text-gray-600 text-center">
                                Enter OTP send to your email{' '}
                                <strong>"{email}"</strong>
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 w-4/5">
                            <OTPInput
                                setOtp={handleOtpChange}
                                onSubmit={() =>
                                    handleVerifyOtp({
                                        loginUserName: userName || '',
                                        otp: otp || '',
                                    })
                                }
                            />
                        </div>
                        <div className="w-4/5 flex flex-col items-center gap-2">
                            <Button
                                onClick={() =>
                                    handleVerifyOtp({
                                        loginUserName: userName || '',
                                        otp: otp || '',
                                    })
                                }
                                title="Verify OTP"
                                width={'100%'}
                            />

                            <p
                                className="text-xs cursor-pointer underline text-gray-00"
                                onClick={() => handleLogin(userName || '')}
                            >
                                Resend OTP
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyOTP
