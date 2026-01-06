const axios = require('axios');

async function testNominatim() {
    console.log("🚀 เริ่มทดสอบ OpenStreetMap (Nominatim)...");

    // 🎯 สิ่งที่เราจะค้นหา
    const query = "Bangkok"; 

    try {
        // ยิง Request ไปที่ API
        // User-Agent: เป็นมารยาทที่ต้องใส่ เพื่อบอกว่าเราคือใคร (ใส่อีเมลหรือชื่อแอป)
        const url = `https://nominatim.openstreetmap.org/search`;
        const response = await axios.get(url, {
            params: {
                q: query,
                format: "json",
                limit: 1,
                "accept-language": "en-US" // ขอชื่อภาษาอังกฤษ
            },
            headers: {
                "User-Agent": "MyTravelApp-Test/1.0" 
            }
        });

        const data = response.data;

        if (data && data.length > 0) {
            const result = data[0];
            console.log("\n✅ ค้นหาเจอแล้ว!");
            console.log(`📍 ชื่อเต็ม: ${result.display_name}`);
            console.log(`🌍 พิกัด: ${result.lat}, ${result.lon}`);
            console.log(`🆔 Place ID: ${result.place_id}`);
            console.log(`ประเภท: ${result.type} (${result.class})`);
        } else {
            console.log("❌ ไม่พบข้อมูลเมืองนี้");
        }

    } catch (error) {
        console.error("💥 เกิดข้อผิดพลาด:", error.message);
    }
}

testNominatim();