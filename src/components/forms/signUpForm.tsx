import { twMerge } from "tailwind-merge";

function SignUpForm({ className }: { className?: string }) {
    return (
        <form className={twMerge("bg-red-500 w-12 h-12", className)}>

        </form>
    );
}

export default SignUpForm;