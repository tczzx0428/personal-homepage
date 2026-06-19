/**
 * AI API abstraction — DeepSeek for resume parsing & certificate scanning.
 * Karpathy: simple fetch wrapper, no unnecessary config layers.
 */

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_KEY = () => localStorage.getItem('deepseek-api-key') || '';

export function setDeepSeekKey(key) {
  localStorage.setItem('deepseek-api-key', key);
}

export function getDeepSeekKey() {
  return localStorage.getItem('deepseek-api-key') || '';
}

async function chat(systemPrompt, userContent, imageBase64 = null) {
  const key = DEEPSEEK_KEY();
  if (!key) throw new Error('请先设置 DeepSeek API Key');

  const messages = [{ role: 'system', content: systemPrompt }];

  if (imageBase64) {
    messages.push({
      role: 'user',
      content: [
        { type: 'text', text: userContent },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
      ],
    });
  } else {
    messages.push({ role: 'user', content: userContent });
  }

  const res = await fetch(DEEPSEEK_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'deepseek-chat', messages, temperature: 0.1, max_tokens: 2048 }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

/**
 * Parse resume from text (Word/TXT content) → structured profile.
 */
export async function parseResume(textContent) {
  const system = `你是一个简历解析专家。从以下文本中提取个人信息，返回严格JSON格式（不要markdown包裹）：
{
  "name": "姓名",
  "title": "头衔/职位",
  "bio": "一句话个人简介",
  "email": "邮箱",
  "github": "GitHub链接或空字符串",
  "linkedin": "LinkedIn链接或空字符串",
  "education": [{"school": "学校", "degree": "学位", "field": "专业", "start": "开始年份", "end": "结束年份"}],
  "work": [{"company": "公司", "role": "职位", "start": "开始年份", "end": "结束年份", "description": "工作描述"}],
  "skills": ["技能1", "技能2"]
}
没有的信息填空字符串或空数组。年份用4位数字。`;

  const result = await chat(system, textContent);
  return JSON.parse(result.replace(/```json|```/g, '').trim());
}

/**
 * Scan certificate image → structured certificate info.
 */
export async function scanCertificate(imageBase64) {
  const system = `你是一个证件/证书识别专家。从图片中提取证书信息，返回严格JSON格式（不要markdown包裹）：
{
  "title": "证书名称",
  "issuer": "颁发机构",
  "date": "日期(YYYY-MM-DD)",
  "category": "certificate|award|license|other",
  "description": "一句话说明"
}
看不清的字段填空字符串。`;

  const result = await chat(system, '请识别这张证书图片中的信息', imageBase64);
  return JSON.parse(result.replace(/```json|```/g, '').trim());
}
