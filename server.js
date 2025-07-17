const express=require('express');

const cors=require('cors');

const pool=require('./db');

const openai=require('./openai');

const app=express();

app.use(express.json());

app.use(cors());

const PORT =3000;


app.post('/users',async(req,res)=>{
    const{name,email}=req.body;
    try{
        const result=await pool.query('INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *',[name,email]);
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({
            error:err.message
        });
    }
});

app.post('/topics',async(req,res)=>{
    const{user_id,name,tags}=req.body;
    try {
    const result = await pool.query('INSERT INTO topics (userid, name, tags) VALUES ($1, $2, $3) RETURNING *', [user_id, name, tags]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/study',async(req,res)=>{
    const{topicid,notes,duration}=req.body;
    try{
        const summaryresponse=await openai.chat.completions.create({
            model:'deepseek/deepseek-r1:free',
            messages:[
                { role :'user' , content :`Summarize the study notes :${notes}`}
            ]
        });

        const summary=summaryresponse.choices[0].message.content;

        const result=await pool.query('INSERT INTO studysessions (topicid,notes,summary,duration) VALUES ($1,$2,$3,$4) RETURNING *',[topicid,notes,summary,duration]);
        res.json(result.rows[0]);
    
    }catch(err){
        res.status(500).json({
            error:err.message
        });
    }
});

app.get('/analytics/:userid',async(req,res)=>{
    const {userid}=req.params;
    try{
        const result=await pool.query(`
            WITH topicsummary AS ( SELECT t.name AS topic,SUM(s.duration) as total_minutes FROM studysessions s JOIN topics t on t.id=s.topicid WHERE t.userid=$1 GROUP BY t.name)
            SELECT * FROM topicsummary ORDER BY total_minutes DESC ;`,[userid]);
            res.json(result.rows);
        
    }catch(err){
        res.status(500).json({
            error:err.message
        });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));