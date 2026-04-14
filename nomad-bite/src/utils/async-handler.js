const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // #region agent log
    fetch('http://127.0.0.1:7271/ingest/9233227c-b5d8-4a1d-84f7-08fd85596e5a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'59e32c'},body:JSON.stringify({sessionId:'59e32c',runId:'pre-fix',hypothesisId:'D',location:'src/utils/async-handler.js:entry',message:'asyncHandler invoked',data:{path:req?.originalUrl||null,method:req?.method||null,nextType:typeof next,handlerType:typeof requestHandler,handlerName:requestHandler?.name||null},timestamp:Date.now()})}).catch(()=>{});
    try { const p={sessionId:'59e32c',runId:'pre-fix',hypothesisId:'D',location:'src/utils/async-handler.js:entry',message:'asyncHandler invoked (file)',data:{path:req?.originalUrl||null,method:req?.method||null,nextType:typeof next,handlerType:typeof requestHandler,handlerName:requestHandler?.name||null},timestamp:Date.now()}; import('node:fs/promises').then(fs=>fs.appendFile('D:\\\\fsdl\\\\code-files\\\\travel\\\\.cursor\\\\debug-59e32c.log',JSON.stringify(p)+'\\n')).catch(()=>{});} catch {}
    // #endregion agent log

    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      // #region agent log
      fetch('http://127.0.0.1:7271/ingest/9233227c-b5d8-4a1d-84f7-08fd85596e5a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'59e32c'},body:JSON.stringify({sessionId:'59e32c',runId:'pre-fix',hypothesisId:'D',location:'src/utils/async-handler.js:catch',message:'asyncHandler caught error',data:{path:req?.originalUrl||null,method:req?.method||null,nextType:typeof next,errName:err?.name||null,errMessage:err?.message||null},timestamp:Date.now()})}).catch(()=>{});
      try { const p={sessionId:'59e32c',runId:'pre-fix',hypothesisId:'D',location:'src/utils/async-handler.js:catch',message:'asyncHandler caught error (file)',data:{path:req?.originalUrl||null,method:req?.method||null,nextType:typeof next,errName:err?.name||null,errMessage:err?.message||null},timestamp:Date.now()}; import('node:fs/promises').then(fs=>fs.appendFile('D:\\\\fsdl\\\\code-files\\\\travel\\\\.cursor\\\\debug-59e32c.log',JSON.stringify(p)+'\\n')).catch(()=>{});} catch {}
      // #endregion agent log
      if (typeof next === "function") return next(err);
      throw err;
    });
  };
};

export default asyncHandler;
