import { videos } from '@/data/media';

export async function GET(request:Request) {
  const id=new URL(request.url).searchParams.get('id')||'';
  if(!Object.hasOwn(videos,id))return Response.json({error:'Unknown official video'},{status:400});
  try {
    const response=await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`,{next:{revalidate:86400},signal:AbortSignal.timeout(7000)});
    if(!response.ok)throw new Error('Official preview unavailable');
    const data=await response.json();
    const thumbnail=new URL(data.thumbnail_url);
    if(thumbnail.protocol!=='https:'||thumbnail.hostname!=='i.ytimg.com')throw new Error('Unexpected preview provider');
    return Response.json({id,title:data.title,author:data.author_name,thumbnailUrl:thumbnail.href,width:data.thumbnail_width,height:data.thumbnail_height},{headers:{'Cache-Control':'public, max-age=3600, s-maxage=86400'}});
  }catch{return Response.json({error:'Official preview temporarily unavailable'},{status:502});}
}
