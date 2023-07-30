'use client'

import { cn } from '@/lib/utils'
import { FC, useState } from 'react'
import { Button } from './ui/Button'
import {signIn} from 'next-auth/react'
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  
}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const {toast} = useToast()
 const logginWithGoogle =  async() =>{
    setIsLoading(true)
    try{
    
        await signIn('google')
      
    }catch(error){
  toast({
    title: 'there was a problem',
    description: 'there was an error logging with google',
    variant: 'destructive',
  });
    }finally{
        setIsLoading(false)
    }
 }

  return( 
<div className={cn('flex justify-center', className)} {...props}>
  <Button
    isLoading={isLoading}
    type="button"
    size="sm"
    className="w-full"
    onClick={logginWithGoogle}
    disabled={isLoading}
  >
    {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
    Google
  </Button>
</div>
)}

export default UserAuthForm