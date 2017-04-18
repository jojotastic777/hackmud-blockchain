function(context, args) {//start:pin, target:#s.target.npc, username:"valid username"
	var caller = context.caller;
	var l = #s.scripts.lib();

	var retStr = "===============\n";
	for (var i = args.start; i < args.start+50; i++) {
		var currPin=('000'+i).slice(-4);
		var response = args.target.call({ username:args.username, pin:currPin });
		//#s.chats.tell({ to:"jojotastic",  msg:response});
		if (response.length != 87 && response.length != 84) {
			retStr += "Length: "+response.length+"\nPin: "+currPin+"\nContents:\n"+response+"\n===============\n";
		} else {
			retStr += "Length: "+response.length+"\nPin: "+currPin+"\n===============\n";
		}
		//retStr += response.length+": \""+currPin+"\"\n\n";
	}

	return { ok:true, msg:retStr};
}
