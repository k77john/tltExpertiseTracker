import { useState } from 'react'
import { Button, InputField } from '../../components'
import OTPInput from '../../components/otpInput/OTPInput'
import { BrandLogo } from '../../assets/images'

function Login() {
    const [otp, setOtp] = useState<boolean>(false)

    return (
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
                            Log-in with your registered Email Id
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 w-4/5">
                        {!otp && (
                            <InputField
                                placeholder="Enter your email"
                                label="Email"
                                onChange={() => {}}
                                width={'100%'}
                            />
                        )}

                        {otp && <OTPInput />}
                    </div>
                    <div className="w-4/5 flex flex-col items-center gap-2">
                        {!otp && (
                            <Button
                                onClick={() => setOtp(true)}
                                title="Send OTP"
                                width={'100%'}
                            />
                        )}

                        {otp && (
                            <Button
                                onClick={() => setOtp(true)}
                                title="Verify OTP"
                                width={'100%'}
                            />
                        )}

                        {otp && (
                            <p className="text-xs cursor-pointer underline text-gray-00">
                                Resend OTP
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
