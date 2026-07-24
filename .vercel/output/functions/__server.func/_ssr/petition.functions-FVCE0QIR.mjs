import { c as createServerFn, i as TSS_SERVER_FUNCTION, y as __toESM } from "./createServerFn-BpgqxZjr.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as require_nodemailer } from "../_libs/nodemailer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/petition.functions-FVCE0QIR.js
var import_nodemailer = /* @__PURE__ */ __toESM(require_nodemailer());
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var signInput = objectType({
	name: stringType().trim().min(2, "Please enter your full name").max(100),
	email: stringType().trim().toLowerCase().email("Please enter a valid email").max(255)
});
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function serverClient() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_PUBLISHABLE_KEY;
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			storage: void 0
		},
		global: { fetch: createSupabaseFetch(key) }
	});
}
var signPetition_createServerFn_handler = createServerRpc({
	id: "db628e9f56c100202510c1d9dba52d1f67669868d0728940e0314836bad9c568",
	name: "signPetition",
	filename: "src/lib/petition.functions.ts"
}, (opts) => signPetition.__executeServer(opts));
var signPetition = createServerFn({ method: "POST" }).validator((data) => signInput.parse(data)).handler(signPetition_createServerFn_handler, async ({ data }) => {
	const supabase = serverClient();
	const { error } = await supabase.from("petition_signatures").insert({
		name: data.name,
		email: data.email
	});
	if (error) {
		if (error.code === "23505") throw new Error("This email has already signed the petition.");
		console.error("[signPetition] insert failed:", error);
		throw new Error("We couldn't record your signature. Please try again.");
	}
	try {
		await sendPetitionEmails(data.name, data.email);
	} catch (e) {
		console.error("[signPetition] email dispatch failed:", e);
	}
	const { count } = await supabase.from("petition_signatures").select("*", {
		count: "exact",
		head: true
	});
	return {
		ok: true,
		total: count ?? 0
	};
});
var getPetitionStats_createServerFn_handler = createServerRpc({
	id: "290c3254fad5d8e6aa219c8cf772579890fdaa2de3ef6cb3323f127d81d6b753",
	name: "getPetitionStats",
	filename: "src/lib/petition.functions.ts"
}, (opts) => getPetitionStats.__executeServer(opts));
var getPetitionStats = createServerFn({ method: "GET" }).handler(getPetitionStats_createServerFn_handler, async () => {
	const supabase = serverClient();
	const { count } = await supabase.from("petition_signatures").select("*", {
		count: "exact",
		head: true
	});
	const { data: recent } = await supabase.from("petition_signatures").select("name, created_at").order("created_at", { ascending: false }).limit(12);
	return {
		total: count ?? 0,
		recent: recent ?? []
	};
});
function createTransporter() {
	const email = process.env.GMAIL_EMAIL;
	const password = process.env.GMAIL_APP_PASSWORD;
	if (!email || !password) return null;
	return import_nodemailer.default.createTransport({
		service: "gmail",
		auth: {
			user: email,
			pass: password
		}
	});
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sendPetitionEmails(signerName, signerEmail) {
	const transporter = createTransporter();
	if (!transporter) {
		console.warn("[sendPetitionEmails] Missing GMAIL_EMAIL or GMAIL_APP_PASSWORD env vars; skipping.");
		return;
	}
	const subject = "Citizen Petition: End Brutality Against Student Protesters at Jantar Mantar";
	const body = [
		`Respected Sir/Madam,`,
		``,
		`A citizen has signed a petition calling for immediate action against the brutality inflicted on peaceful student protesters at Jantar Mantar, Delhi.`,
		``,
		`Signer details:`,
		`  Name: ${signerName}`,
		`  Email: ${signerEmail}`,
		`  Time: ${(/* @__PURE__ */ new Date()).toUTCString()}`,
		``,
		`We urge your office to:`,
		`  1. Investigate the incidents of police excess against student protesters.`,
		`  2. Ensure the constitutional right to peaceful protest is protected.`,
		`  3. Hold those responsible for the violence accountable.`,
		``,
		`This message was sent on behalf of a signatory of the online petition hosted at Petition for Peace.`,
		``,
		`Regards,`,
		`Petition for Peace`
	].join("\r\n");
	const from = `"Petition for Peace" <${process.env.GMAIL_EMAIL}>`;
	try {
		await transporter.sendMail({
			from,
			to: "\"Supreme Court of India\" <supremecourt@nic.in>",
			cc: ["\"Prime Minister's Office\" <connect@mygov.nic.in>", "\"Ministry of Education\" <minister.sm@gov.in>"],
			subject,
			text: body
		});
		console.log(`[sendPetitionEmails] Email sent for signer ${signerName} successfully`);
	} catch (err) {
		console.error(`[sendPetitionEmails] Email failed for signer ${signerName}:`, err);
	}
}
var catchUpEmails_createServerFn_handler = createServerRpc({
	id: "3f60bbca8a69d7ae029e7f553d786d6d90ab561281d9cc00d030c44a6abc9a5f",
	name: "catchUpEmails",
	filename: "src/lib/petition.functions.ts"
}, (opts) => catchUpEmails.__executeServer(opts));
var catchUpEmails = createServerFn({ method: "POST" }).handler(catchUpEmails_createServerFn_handler, async () => {
	const { data: signatories, error } = await serverClient().from("petition_signatures").select("name, email, created_at").order("created_at", { ascending: true });
	if (error) {
		console.error("[catchUpEmails] Failed to fetch signatories:", error);
		return {
			ok: false,
			sent: 0,
			total: 0
		};
	}
	const transporter = createTransporter();
	if (!transporter) {
		console.warn("[catchUpEmails] Missing GMAIL_EMAIL or GMAIL_APP_PASSWORD env vars; aborting.");
		return {
			ok: false,
			sent: 0,
			total: signatories?.length ?? 0
		};
	}
	const subject = "Citizen Petition: End Brutality Against Student Protesters at Jantar Mantar";
	const from = `"Petition for Peace" <${process.env.GMAIL_EMAIL}>`;
	let sent = 0;
	for (const s of signatories) {
		const body = [
			`Respected Sir/Madam,`,
			``,
			`A citizen has signed a petition calling for immediate action against the brutality inflicted on peaceful student protesters at Jantar Mantar, Delhi.`,
			``,
			`Signer details:`,
			`  Name: ${s.name}`,
			`  Email: ${s.email}`,
			`  Time: ${new Date(s.created_at).toUTCString()}`,
			``,
			`We urge your office to:`,
			`  1. Investigate the incidents of police excess against student protesters.`,
			`  2. Ensure the constitutional right to peaceful protest is protected.`,
			`  3. Hold those responsible for the violence accountable.`,
			``,
			`This message was sent on behalf of a signatory of the online petition hosted at Petition for Peace.`,
			``,
			`Regards,`,
			`Petition for Peace`
		].join("\r\n");
		try {
			await transporter.sendMail({
				from,
				to: "\"Supreme Court of India\" <supremecourt@nic.in>",
				cc: ["\"Prime Minister's Office\" <connect@mygov.nic.in>", "\"Ministry of Education\" <minister.sm@gov.in>"],
				subject,
				text: body
			});
			sent++;
			console.log(`[catchUpEmails] Sent email for signer #${sent}: ${s.name} <${s.email}>`);
			await sleep(3e3);
		} catch (err) {
			console.error(`[catchUpEmails] Failed for signer ${s.name} <${s.email}>:`, err);
		}
	}
	return {
		ok: true,
		sent,
		total: signatories.length
	};
});
//#endregion
export { catchUpEmails_createServerFn_handler, getPetitionStats_createServerFn_handler, signPetition_createServerFn_handler };
