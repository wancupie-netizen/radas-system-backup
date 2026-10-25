export const DEFAULT_EDITOR='https://radas-buku-forex-crypto.hawaiskandar.chatgpt.site';
export const validSlug=s=>typeof s==='string'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)&&s.length<=80;
export const validMedia=s=>typeof s==='string'&&/^[a-z0-9-]+\.(png|jpg|webp)$/.test(s)&&s.length<100;
export async function forwardSales(req,res,{media=false,fetcher=fetch,env=process.env}={}){
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET'&&req.method!=='HEAD'){res.setHeader('Allow','GET, HEAD');return res.status(405).send('Method not allowed')}
 const value=media?req.query.name:req.query.slug;
 if(!(media?validMedia(value):validSlug(value)))return res.status(404).send('Halaman tidak ditemui.');
 const token=env.RADAS_SALES_BACKEND_TOKEN;
 if(!token)return res.status(503).send('Halaman jualan sedang disediakan. Sila cuba semula kemudian.');
 const target=new URL(media?'/media/'+value:'/api/public-page',DEFAULT_EDITOR);
 if(!media){target.searchParams.set('slug',value);target.searchParams.set('proxy','1')}
 try{
 const upstream=await fetcher(target,{headers:{'OAI-Sites-Authorization':'Bearer '+token},redirect:'error',signal:AbortSignal.timeout(15000)});
 if(upstream.status===404)return res.status(404).send(media?'Gambar tidak ditemui.':'Halaman tidak ditemui atau belum diterbitkan.');
 const type=upstream.headers.get('content-type')||'';
 if(!upstream.ok||!(media?/^image\/(png|jpeg|webp)(;|$)/.test(type):/^text\/html(;|$)/.test(type)))return res.status(502).send('Halaman tidak dapat dimuatkan. Sila cuba semula.');
 const body=Buffer.from(await upstream.arrayBuffer());if(body.length>(media?6*1024*1024:1024*1024))return res.status(502).send('Respons terlalu besar.');
 if(env.VERCEL_ENV!=='production')res.setHeader('X-Robots-Tag','noindex, nofollow');
 res.setHeader('Content-Type',type);if(media)res.setHeader('Cache-Control','public, max-age=31536000, immutable');
 return req.method==='HEAD'?res.status(200).end():res.status(200).send(body);
 }catch{return res.status(502).send('Halaman tidak dapat dimuatkan. Sila cuba semula.')}
}
