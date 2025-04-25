/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function HomePage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`)
    const data = await res.json()
    setHistory(data)
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleCheck = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/palindrome`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })

    const data = await res.json()
    setResult(data.result)
    setText('')
    fetchHistory()
  }

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verificador de Palíndromos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="text">Palabra o frase:</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ej: anita lava la tina"
          />
          <Button onClick={handleCheck} disabled={!text.trim()}>
            Verificar
          </Button>
          <Button
            variant="destructive"
            className="m-4"
            onClick={async () => {
              const confirm = window.confirm(
                '¿Seguro que querés borrar el historial?'
              )
              if (!confirm) return

              await fetch('http://localhost:3001/history', { method: 'DELETE' })
              setHistory([])
              setResult(null)
            }}
          >
            Limpiar historial
          </Button>

          {result !== null && (
            <p className="text-lg font-medium">
              Resultado: {result ? '✅ Es palíndromo' : '❌ No es palíndromo'}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            {history.map((item, i) => (
              <li key={i} className="flex justify-between">
                <span>{item.text}</span>
                <span>{item.result ? '✅' : '❌'}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
