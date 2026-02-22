import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, type SubmitHandler, FormProvider } from 'react-hook-form'
import { object, string, type TypeOf } from 'zod'
import { Turnstile } from '@marsidev/react-turnstile'

import { Box } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import type { RegisterPayload } from "../../../contexts/auth/types";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { StyledLoadingButton } from "../../../components/StyledButtons";
import { validationErrors } from "../../../helpers/validationErrors";
import FormInputText from "../../../components/FormInputs/Text/FormInputText";
import { turnstileSiteKey } from "../../../env";

const registerSchema = object({
	name: string().max(32, validationErrors.max("имя", 32)),
	email: string()
		.nonempty(validationErrors.required("почта"))
		.email(validationErrors.email()),
	password: string()
		.nonempty(validationErrors.required("пароль"))
		.min(8, validationErrors.min("пароль", 8))
		.max(32, validationErrors.max("пароль", 32)),
	passwordConfirm: string().nonempty(
		validationErrors.required("подтверждение пароля"),
	),
}).refine((data) => data.password === data.passwordConfirm, {
	path: ["passwordConfirm"],
	message: "Пароли не совпадают",
});

type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [captcha, setCaptcha] = useState<string | null>(null);

	const { register: registerUser } = useAuth();
	const methods = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
		  name: 'admin',
		  email: 'admin@example.com',
		  password: 'admin123',
		  passwordConfirm: 'admin123',
		},
	});

	const { reset, handleSubmit } = methods;

	const onSubmitHandler: SubmitHandler<RegisterInput> = ({
		email,
		password,
		name,
	}) => {
		const payload: RegisterPayload = {
			email,
			password,
			name,
		};

		setLoading(true);

		registerUser(payload)
			.then(() => {
				reset();
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<FormProvider {...methods}>
				<FormInputText name="name" label="Имя" />

				<FormInputText name="email" label="Почта" type="email" />

				<FormInputText name="password" label="Пароль" type="password" />

				<FormInputText
					name="passwordConfirm"
					label="Подтверждение пароля"
					type="password"
				/>
			</FormProvider>

			<Turnstile
				siteKey={turnstileSiteKey}
				onSuccess={(token) => setCaptcha(token)}
				onExpire={() => setCaptcha(null)}
				style={{ marginBottom: '10px' }}
			/>

			<Link to="/login">Войти</Link>

			<StyledLoadingButton
				variant="contained"
				fullWidth
				type="submit"
				loading={loading}
				disabled={!captcha}
				sx={{ py: "0.8rem", mt: "1rem" }}
			>
				Зарегистрироваться
			</StyledLoadingButton>
		</Box>
	);
};

export default RegisterPage;
