"use client"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TitleFormProps {
    initialData: {
        title:string;
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required."
    })
})

const TitleForm = ( { initialData,courseId } : TitleFormProps) => {
    const router = useRouter();

    const [isEditting,setIsEditting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Course updated");
            setIsEditting((prev)=>!prev)
            router.refresh;
        }catch{
            toast.error("Something went wrong")  
        }
    }
  return ( 
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            Course Title
            <Button variant={"ghost"} onClick={ ()=> setIsEditting((prev)=>!prev) }>
                {isEditting ? (
                    <>Cancel</>
                ) : (
                    <>
                        <Pencil className='h-4 w-4 mr-2'/>
                        Edit title
                    </>
                )}
                
            </Button>
        </div>
        {!isEditting ? (
            <p className='text-sm mt-2'>{initialData.title}</p>
        ) : (
            <Form {...form}>
                <form onSubmit={ form.handleSubmit(onSubmit) } className='space-y-4 mt-4'>
                <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input 
                                placeholder="e.g. 'Advanced Web Development'" 
                                {...field}
                                disabled={isSubmitting}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}/>
                    <div className='flex items-center gap-x-2'>
                        <Button type="submit" disabled={isSubmitting|| !isValid}>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        )}
    </div>
  )
}

export default TitleForm