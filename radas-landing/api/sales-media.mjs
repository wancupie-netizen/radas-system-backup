import {forwardSales} from '../server/sales-proxy.mjs';
export default function handler(req,res){return forwardSales(req,res,{media:true})}
