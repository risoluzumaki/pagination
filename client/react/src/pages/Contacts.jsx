import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router'

const API_BASE = 'http://localhost:3000/api/v1/contacts'

export default function Contacts(){
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const pageParam = parseInt(searchParams.get('page')) || 1
  const limitParam = parseInt(searchParams.get('limit')) || 10

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    let mounted = true
    async function load(){
      setLoading(true)
      setError(null)
      try{
        const resp = await fetch(`${API_BASE}?page=${pageParam}&limit=${limitParam}`)
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const payload = await resp.json()
        if (!mounted) return
        setData(payload.data || [])
        setTotal(payload.total || 0)
        setTotalPages(payload.totalPages || 0)
      }catch(err){
        setError(err.message)
        setData([])
        setTotal(0)
        setTotalPages(0)
      }finally{
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [pageParam, limitParam])

  function updateParams(newPage, newLimit){
    const next = {}
    if (newPage != null) next.page = newPage
    if (newLimit != null) next.limit = newLimit
    setSearchParams(Object.fromEntries(Object.entries({...Object.fromEntries(searchParams), ...next}).filter(([k,v]) => v != null && v !== '')))
  }

  return (
    <div style={{padding: 20}}>
      <h2>Contacts</h2>

      <div style={{marginBottom: 12}}>
        <label style={{marginRight: 8}}>Per page:
          <select value={limitParam} onChange={(e)=> updateParams(1, parseInt(e.target.value))} style={{marginLeft:8}}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>

        <div style={{display:'inline-block', marginLeft: 20}}>
          Page <strong>{pageParam}</strong> of <strong>{totalPages || '—'}</strong> — total {total}
        </div>
      </div>

      <div style={{marginBottom:12}}>
        <button onClick={()=> updateParams(Math.max(1, pageParam-1), null)} disabled={loading || pageParam<=1}>Prev</button>
        <button onClick={()=> updateParams(Math.min(totalPages || Infinity, pageParam+1), null)} disabled={loading || (totalPages>0 && pageParam>=totalPages)} style={{marginLeft:8}}>Next</button>

        <span style={{marginLeft:12}}>Jump to:</span>
        <input type='number' min={1} max={totalPages||undefined} defaultValue={pageParam} style={{width:80, marginLeft:8}} onKeyDown={(e)=>{
          if (e.key === 'Enter'){
            const val = parseInt(e.target.value)
            if (!isNaN(val) && val >= 1 && (totalPages === 0 || val <= totalPages)) updateParams(val,null)
          }
        }}/>
        <button style={{marginLeft:8}} onClick={(e)=>{
          const input = e.target.parentNode.querySelector('input[type=number]')
          const val = parseInt(input.value)
          if (!isNaN(val) && val >= 1 && (totalPages === 0 || val <= totalPages)) updateParams(val,null)
        }}>Go</button>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div style={{color:'red'}}>Error: {error}</div>}

      <ul style={{listStyle:'none', padding: 0}}>
        {data.map(c => (
          <li key={c.id} style={{padding:10, border:'1px solid #ddd', marginBottom:6, borderRadius:6}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <div style={{fontWeight:700}}>{c.name}</div>
                <div style={{color:'#666'}}>ID: {c.id}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div>{c.email}</div>
                <div style={{color:'#666'}}>{c.phone}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

    </div>
  )
}
