import { useCallback, useState } from 'react'
import { Header } from './Header'
import { Hero, Achievements } from './Hero'
import { Portfolio, Gallery, ProjectDetail } from './Portfolio'
import { Expertise, Process, Faq } from './Expertise'
import { Footer, About, Contact } from './Footer'
import { Modal } from './Modal'
import { Consultation } from './Consultation'
import { useList, type Project, type Editorial, type DialogState } from '../lib/studio'
import './studio.css'

export default function StudioPage() {
  const projectData = useList<Project>('/api/projects')
  const editorialData = useList<Editorial>('/api/editorial')
  const [dialog, setDialog] = useState<DialogState>(null)
  const [selected, setSelected] = useState('corporate')
  const close = useCallback(() => setDialog(null), [])
  const services = editorialData.items.filter(e => e.kind === 'service')
  const chooseService = (slug: string) => { setSelected(slug); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  return <div className="studio" dir="rtl" id="top"><a className="skip-link" href="#main">رفتن به محتوای اصلی</a><Header services={services} open={setDialog} chooseService={chooseService}/><main id="main"><Hero open={setDialog}/><Achievements metrics={editorialData.items.filter(e => e.kind === 'metric')} loading={editorialData.loading} error={editorialData.error} retry={editorialData.retry}/><Portfolio projects={projectData.items} loading={projectData.loading} error={projectData.error} retry={projectData.retry} open={setDialog}/><Expertise services={services} selected={selected} select={setSelected} open={setDialog} loading={editorialData.loading} error={editorialData.error} retry={editorialData.retry}/><Process steps={editorialData.items.filter(e => e.kind === 'process')} open={setDialog}/><Faq faqs={editorialData.items.filter(e => e.kind === 'faq')} open={setDialog}/></main><Footer open={setDialog}/>{dialog && <Modal close={close} identity={dialog.type + (dialog.type === 'project' ? dialog.project.slug : '')} variant={`modal-${dialog.type}`}>{dialog.type === 'consultation' && <Consultation services={services} initialService={dialog.service} initialBrief={dialog.brief} close={close}/>} {dialog.type === 'gallery' && <Gallery projects={projectData.items} loading={projectData.loading} error={projectData.error} retry={projectData.retry} open={setDialog}/>} {dialog.type === 'project' && <ProjectDetail project={dialog.project} open={setDialog} back={dialog.fromGallery}/>} {dialog.type === 'about' && <About open={setDialog}/>} {dialog.type === 'contact' && <Contact open={setDialog}/>}</Modal>}</div>
}
