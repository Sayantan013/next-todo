import { prisma } from '@/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function createTodo(data: FormData){
    'use server'
    const title = data.get("title")?.valueOf()
    if(typeof title !== 'string' || title.length === 0){
        throw new Error("Invalid Post")
    }

    await prisma.todo.create({ data : { title, complete: false}})
    redirect("/")
}

export default function New(){
    return (
        <>
            <header className="flex items-center mb-4">
                <h1 className="text-2xl">New</h1>
            </header>

            <form action={createTodo} className="flex flex-col gap-2">
                <input type="text" 
                name="title"
                className="border border-slate-300 rounded bg-transparent px-2 py-1 outline-none" />
                
                <div className="flex justify-end gap-2">
                    <Link href='..'
                    className="border border-slate-300 rounded bg-transparent px-2 py-1 outline-none focus-within:bg-slate-100">
                        Cancel</Link>
                    <button className="border border-slate-300 rounded bg-transparent px-2 py-1 outline-none">
                        Create</button>
                </div>
            </form>
        </>
    )
}