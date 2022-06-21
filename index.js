addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});
const defaultSize = 16;
function isUrl (url) {
   return /^https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+)/.test(url)
}
async function handleRequest(request) {
  const { pathname,searchParams } = new URL(request.url);
  if (pathname.startsWith("/api/getFavicon")) {
    let url = searchParams.get('url');
    let size = searchParams.get('size');
    // 请求参数判断
    if (!isUrl(url)) {
      //错误信息
      return new Response(JSON.stringify({msg: "参数错误",code: 400}), {
        headers: {
            "content-type": "application/json;charset=UTF-8"
          },
        status: 400
      });
    }
 
    if ( size === null || isNaN(parseInt(size)) || parseInt(size) < 16 ) {
      size = defaultSize;
    }
    return fetch(`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=${size}`);
  }
}