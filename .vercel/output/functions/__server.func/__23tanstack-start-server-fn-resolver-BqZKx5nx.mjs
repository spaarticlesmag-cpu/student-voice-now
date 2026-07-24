//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BqZKx5nx.js
var manifest = {
	"290c3254fad5d8e6aa219c8cf772579890fdaa2de3ef6cb3323f127d81d6b753": {
		functionName: "getPetitionStats_createServerFn_handler",
		importer: () => import("./_ssr/petition.functions-FVCE0QIR.mjs")
	},
	"3f60bbca8a69d7ae029e7f553d786d6d90ab561281d9cc00d030c44a6abc9a5f": {
		functionName: "catchUpEmails_createServerFn_handler",
		importer: () => import("./_ssr/petition.functions-FVCE0QIR.mjs")
	},
	"db628e9f56c100202510c1d9dba52d1f67669868d0728940e0314836bad9c568": {
		functionName: "signPetition_createServerFn_handler",
		importer: () => import("./_ssr/petition.functions-FVCE0QIR.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
