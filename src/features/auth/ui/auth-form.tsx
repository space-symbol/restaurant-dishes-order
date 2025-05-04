import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import cn from "src/shared/lib/cn";
import { Button } from "src/shared/ui/button";
import { Input } from "src/shared/ui/input";
import { z } from "zod";
import { Lock, MailIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../model/hooks/use-auth";
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string({message: "Поле обязательное"}).email({message: "Некорректная почта"}),
  password: z.string({message: "Поле обязательное"}).min(6, {message: "Минимум 6 символов"}),
});
  
interface AuthFormProps {
  className?: string;
  isRegister?: boolean;
}

export const AuthForm = (props: AuthFormProps) => {
  const { className, isRegister } = props;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const { mutate, error } = useAuth({
    isRegister: isRegister ?? false,
    onSuccess: () => {
      navigate("/");
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange",
  });

 


  const handleFormSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <form onSubmit={handleFormSubmit} id="loginForm" className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                error={errors.email?.message} 
                autoComplete="email" 
                size="small" 
                variant="outlined" 
                label="Почта" 
                startIcon={<MailIcon className="w-4 h-4" />} 
                placeholder="example@mail.com"
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                error={errors.password?.message} 
                autoComplete={isRegister ? "new-password" : "current-password"} 
                type="password" 
                size="small" 
                variant="outlined" 
                label="Пароль" 
                placeholder="••••••••" 
                startIcon={<Lock className="w-4 h-4" />} 
                showPassword={showPassword} 
                onEyeClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              />
            )}
          />        
        </div>
        <Button disabled={isSubmitting}>
          {isSubmitting 
            ? "Загрузка..." 
            : isRegister 
              ? "Зарегистрироваться"
              : "Войти"
          }
        </Button>
      </form>
      {error && (
        <p className="text-error text-sm text-center">{error.message}</p>
      )}
    </div>
  );
};