const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { createClient } = require("@supabase/supabase-js");
const summarizeAndSend = require("../services/summarize.js");

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

router.get("/todos", async (req, res) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error });
  res.json({ success: true, Data: data });
});

router.post("/todos", async (req, res) => {
  const { task, status = "pending" } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .insert([{ task, status }])
    .select();
  if (error) return res.status(500).json({ error });
  res.json({ success: true, Data: data[0] });
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const { data, error } = await supabase
    .from("todos")
    .update({ task })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
  res.json({ success: true, data: data[0] });
});


router.put("/todos_status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { data, error } = await supabase
    .from("todos")
    .update({ status })
    .eq("id", id)
    .select();
  if (error) return res.status(500).json({ error });
  res.json({ success: true, Status: data[0] });
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

router.post("/summarize", async (req, res) => {
  try {
    const summary = await summarizeAndSend();
    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
