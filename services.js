import {db} from "./config";

export const addItem =  (user, full, mo, tu, we, th, fr, sa, su, startd, startm, starty) => {
	startm = startm + 1;
	
	if (startm < 10) {
		if (startd < 10) {
	
		db.ref('/week/').child(user).child(starty.toString() + "0" + startm.toString() + "0" + startd.toString()).set({
			total: full,
			startD: startd,
			startM: startm,
			startY: starty,
			days: [mo, tu, we, th, fr, sa, su]
			
		});
		} else{
		db.ref('/week/').child(user).child(starty.toString() + "0" + startm.toString() + startd.toString()).set({
			total: full,
			startD: startd,
			startM: startm,
			startY: starty,
			days: [mo, tu, we, th, fr, sa, su]
			
		});
		}
	}else{
		if (startd < 10) {
	
		db.ref('/week/').child(user).child(starty.toString() + startm.toString() + "0" + startd.toString()).set({
			total: full,
			startD: startd,
			startM: startm,
			startY: starty,
			days: [mo, tu, we, th, fr, sa, su]
			
		});
		} else{
		db.ref('/week/').child(user).child(starty.toString() + startm.toString() + startd.toString()).set({
			total: full,
			startD: startd,
			startM: startm,
			startY: starty,
			days: [mo, tu, we, th, fr, sa, su]
			
		});
	}
	}
}