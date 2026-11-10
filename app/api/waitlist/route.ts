import { getDb } from '../../../db';
import { waitlist } from '../../../db/schema';
import { eq } from 'drizzle-orm';
const headers = {'Cache-Control':'no-store'};
async function payload(request: Request) {
 const origin = request.headers.get('origin');
 if(origin && origin !== new URL(request.url).origin) throw new Error('origin');
 if(Number(request.headers.get('content-length') || 0)>2048) throw new Error('payload');
 const text = await request.text();
 if(text.length>2048) throw new Error('payload');
 const body = JSON.parse(text);
 if(typeof body.email !== 'string') throw new Error('email');
 body.email=body.email.trim().toLowerCase();
 if(body.email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) throw new Error('email');
 return body;
}
export async function POST(request:Request){
 let body;
 try{body=await payload(request);if(body.consent!==true||!['sage','steel'].includes(body.finish))throw new Error('invalid');}catch{return Response.json({error:'Please enter a valid email and finish.'},{status:400,headers})}
 if(body.website)return Response.json({ok:true},{headers});
 try {await getDb().insert(waitlist).values({email:body.email,finish:body.finish,createdAt:new Date().toISOString(),consentVersion:'launch-updates-v1'}).onConflictDoUpdate({target:waitlist.email,set:{finish:body.finish,consentVersion:'launch-updates-v1'}});return Response.json({ok:true},{status:201,headers});}
 catch{return Response.json({error:'Signup is temporarily unavailable.'},{status:503,headers})}
}
export async function DELETE(request:Request){
 let body;try{body=await payload(request)}catch{return Response.json({error:'Please enter a valid email.'},{status:400,headers})}
 try{await getDb().delete(waitlist).where(eq(waitlist.email,body.email));return Response.json({ok:true},{headers})}catch{return Response.json({error:'Please try again later.'},{status:503,headers})}
}
