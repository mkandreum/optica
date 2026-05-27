import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SPECIALTIES = [
  "Optometría General (Examen Completo)",
  "Control de Miopía Infantil y Juvenil",
  "Terapia Visual y Neuro-Entrenamiento",
  "Baja Visión y Apoyos de Autonomía",
  "Contactología Avanzada (Confort Diario)",
  "Optometría Digital (Filtros Pantallas)",
  "Programa Visión Senior (Evaluación Experta)",
  "Gabinete de Estilismo y Elección de Gafas"
];

export function AppointmentView() {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [preferredDay, setPreferredDay] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [appointmentNote, setAppointmentNote] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const resetBookingForm = () => {
    setStep(1);
    setSelectedSpecialty('');
    setPreferredDay('');
    setPreferredTime('');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setAppointmentNote('');
    setBookingConfirmed(false);
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedSpecialty) return;
    if (step === 2 && (!preferredDay || !preferredTime)) return;
    setStep(step + 1);
  };

  const onSubmitAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    setBookingConfirmed(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] pb-24 font-sans select-none"
    >
      <main className="px-4 md:px-12 pt-6 pb-12 w-full max-w-3xl mx-auto">
        
        {/* Intro Banner */}
        <div className="mb-10 text-center border-b border-[#1A1A1A]/10 pb-6">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-50 font-mono">
            Agenda de Consulta Directa
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase font-serif mt-2 mb-3">
            Pedir Cita <span className="italic text-[#1A1A1A]/70 lowercase">en</span> Consulta
          </h1>
          <p className="text-xs opacity-60 max-w-md mx-auto leading-relaxed font-light">
            Reserva una consulta personalizada con Antonio García Sánchez, Óptico Optometrista Colegiado Nº 11748. Nos tomamos nuestro tiempo para cuidar de tu visión sin prisas.
          </p>
        </div>

        {bookingConfirmed ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#1A1A1A]/10 rounded-3xl p-8 text-center shadow-lg relative overflow-hidden"
          >
            {/* Decorative background circle */}
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full border border-[#1A1A1A]/5"></div>
            
            <div className="w-14 h-14 bg-neutral-900 text-[#F9F9F7] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>

            <h2 className="text-2xl font-semibold uppercase tracking-tight mb-2 font-serif text-[#1A1A1A]">¡Solicitud Recibida!</h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/60 font-light mb-6">
              Hemos registrado tu solicitud correctamente. En un plazo máximo de 12 horas hábiles, nos pondremos en contacto contigo por teléfono para confirmar el día y la hora exacta definitivos para tu cita.
            </p>

            {/* Receipt Summary Ticket */}
            <div className="border border-dashed border-neutral-300 rounded-2xl p-6 bg-neutral-50/50 text-left space-y-3 font-mono text-[11px] uppercase mb-6 select-all">
              <div className="flex justify-between border-b border-neutral-200/50 pb-2">
                <span className="opacity-50">Paciente:</span>
                <span className="font-semibold text-neutral-800">{clientName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200/50 pb-2">
                <span className="opacity-50">Especialidad:</span>
                <span className="font-semibold text-neutral-800 text-right max-w-[180px] truncate">{selectedSpecialty}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200/50 pb-2">
                <span className="opacity-50">Contacto Móvil:</span>
                <span className="font-semibold text-neutral-800">{clientPhone}</span>
              </div>
              {clientEmail && (
                <div className="flex justify-between border-b border-neutral-200/50 pb-2">
                  <span className="opacity-50">Email:</span>
                  <span className="font-semibold text-neutral-800 lowercase">{clientEmail}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-neutral-200/50 pb-2">
                <span className="opacity-50">Preferencia:</span>
                <span className="font-semibold text-neutral-800">{preferredDay} - {preferredTime}</span>
              </div>
              {appointmentNote ? (
                <div className="text-[10px] normal-case opacity-70">
                  <span className="font-semibold block uppercase font-mono text-[11px] opacity-50 mb-1">Observación aportada:</span>
                  "{appointmentNote}"
                </div>
              ) : null}
            </div>

            <button
              onClick={resetBookingForm}
              className="w-full bg-[#1A1A1A] hover:bg-neutral-800 text-[#F9F9F7] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Comenzar Nueva Reserva
            </button>
          </motion.div>
        ) : (
          <div className="bg-white border border-[#1A1A1A]/10 rounded-3xl p-6 sm:p-8 shadow-xs relative">
            
            {/* Steps Indicator row */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6 select-none">
              <span className="text-[9px] uppercase tracking-widest font-mono font-bold opacity-45">Paso {step} de 3</span>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      s === step ? 'bg-neutral-900 w-8' : s < step ? 'bg-neutral-400 w-4' : 'bg-neutral-200 w-4'
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={onSubmitAppointment}>
              {/* Step 1: Services selection */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left">
                  <h3 className="text-base font-semibold uppercase tracking-tight mb-2 text-[#1A1A1A]">Selecciona tu Especialidad</h3>
                  <p className="text-xs text-[#1A1A1A]/60 mb-5 font-light">Selecciona la consulta o estudio clínico visual específico que necesitas agendar.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-76 overflow-y-auto pr-1">
                    {SPECIALTIES.map((spec) => (
                      <button
                        type="button"
                        key={spec}
                        onClick={() => setSelectedSpecialty(spec)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-semibold uppercase tracking-tight transition-all truncate border cursor-pointer ${
                          selectedSpecialty === spec 
                            ? 'bg-[#1A1A1A] text-[#F9F9F7] border-[#1A1A1A] shadow-xs' 
                            : 'bg-white hover:bg-neutral-50 text-[#1A1A1A]/85 border-neutral-200/80'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      disabled={!selectedSpecialty}
                      onClick={handleNextStep}
                      className="w-full bg-[#1A1A1A] disabled:opacity-35 disabled:pointer-events-none hover:bg-neutral-800 text-[#F9F9F7] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Siguiente Paso &rarr;
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date and slot selecting */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left">
                  <h3 className="text-base font-semibold uppercase tracking-tight mb-2 text-[#1A1A1A]">Día y Horario de Preferencia</h3>
                  <p className="text-xs text-[#1A1A1A]/60 mb-5 font-light">Indícanos qué franja horaria te viene mejor y nuestro personal de atención se adaptará.</p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-2 font-mono">Preferencia de Día</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {["Cualquier Día", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => (
                          <button
                            type="button"
                            key={day}
                            onClick={() => setPreferredDay(day)}
                            className={`px-3 py-2 border rounded-xl text-xs tracking-tight transition-all cursor-pointer ${
                              preferredDay === day 
                                ? 'bg-[#1A1A1A] text-[#F9F9F7] border-[#1A1A1A]' 
                                : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-2 font-mono">Preferencia de Horario</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'morning', label: 'Mañanas (09:30-13:30)' },
                          { id: 'afternoon', label: 'Tardes (17:00-20:30)' },
                          { id: 'any', label: 'Cualquier Hora' }
                        ].map((slot) => (
                          <button
                            type="button"
                            key={slot.id}
                            onClick={() => setPreferredTime(slot.label)}
                            className={`px-3 py-3 border rounded-xl text-xs leading-snug tracking-tight text-center transition-all cursor-pointer ${
                              preferredTime === slot.label 
                                ? 'bg-[#1A1A1A] text-[#F9F9F7] border-[#1A1A1A]' 
                                : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-800'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full bg-neutral-100 hover:bg-neutral-200 text-[#1A1A1A] py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      &larr; Volver
                    </button>
                    <button
                      type="button"
                      disabled={!preferredDay || !preferredTime}
                      onClick={handleNextStep}
                      className="w-full bg-[#1A1A1A] disabled:opacity-35 disabled:pointer-events-none hover:bg-neutral-800 text-[#F9F9F7] py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Continuar &rarr;
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact form fields */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left">
                  <h3 className="text-base font-semibold uppercase tracking-tight mb-2 text-[#1A1A1A]">Información de Contacto</h3>
                  <p className="text-xs text-[#1A1A1A]/60 mb-5 font-light">Completa tus datos de identidad clínica para agendar el contacto telefónico.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-1 font-mono">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Introduce tu nombre y apellidos"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]/20 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-1 font-mono">Teléfono móvil de contacto *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 606 370 960"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]/20 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-1 font-mono">Email de contacto (Opcional)</label>
                      <input
                        type="email"
                        placeholder="paciente@correo.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]/20 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-1 font-mono">Síntomas u Observaciones</label>
                      <textarea
                        placeholder="Fatiga visual al usar pantallas, control de miopía infantil, renovación de lentes progresivas..."
                        value={appointmentNote}
                        onChange={(e) => setAppointmentNote(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]/20 transition-all font-sans resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-neutral-100 hover:bg-neutral-200 text-[#1A1A1A] py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      &larr; Volver
                    </button>
                    <button
                      type="submit"
                      disabled={!clientName || !clientPhone}
                      className="w-full bg-[#1A1A1A] disabled:opacity-35 disabled:pointer-events-none hover:bg-neutral-800 text-[#F9F9F7] py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xs cursor-pointer"
                    >
                      Confirmar Cita
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        )}
      </main>
    </motion.div>
  );
}
