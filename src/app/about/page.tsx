"use client";

import { useSession } from 'next-auth/react';

export default function About() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white mb-8" style={{ fontFamily: 'cursive' }}>
          About Me
        </h1>

        <div className="grid md:grid-cols-[320px,1fr] gap-10 mb-12">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
            <div className="relative aspect-square max-w-[220px] mx-auto bg-gradient-to-br from-blue-900/60 to-red-900/40 flex items-center justify-center">
              <div className="absolute inset-4 rounded-2xl bg-black/30 backdrop-blur" />
              <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-blue-600/10 via-red-600/5 to-transparent" />
              <div className="relative w-[88%] h-[88%] rounded-2xl overflow-hidden shadow-xl shadow-blue-600/40 ring-2 ring-blue-500/30 hover:scale-[1.02] transition-transform duration-300">
                {/* Using provided data URI; replace if you change sources */}
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgAEAQMHAgj/xABAEAACAQMCAwUHAwICCAcAAAABAgMABBEFIQYSMRMUQVFhIjJxgZGh0QdSsRUjQsEWJDNzk7Ph8CVDVGJjg6L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAgEQEBAAICAwEBAQEAAAAAAAAAAQIRITEDElEyQXEi/9oADAMBAAIRAxEAPwC21tZWtxrMekzc9qsKEjm5uY4OTn4ir2gJBa6bA5DM4XB5fE+dLlrzI14gdVQ24LDO596mPQighiZs5wfDpvWOX10YdNtw80zlBHyggHetY0yN5DNIAS2OYn0q1eTKk0TyNhQD49aozakpYYy2DttUrX49Oslj5lhQt1zjFLWuwKupahybr3W1OPLLLTZZrI1tzyJykjYZpV11HGpapsc90tTt4+2ta+PqsPJ+ou8H2lvLpTzTSujC5dVKvy9MelN1pp1vJa/3C8hPi5B3+lJvDFxFZ6PGk8EskxuJXSIYBK7bknbFG7TioJdNDc2AhHUdlL2jfQCs7+uV864Z1DQ07CYqodlGQrRjf5+FaNK0WfT7UXlvdLFJIn9yOUDlG/gaGcU8XSvMttZRSp2mAhLcjH1O21ApuJr7Sx2IUGRwOYzS9pj4HO1Pnob+nWPXezZknljdg4TKpyjJG3Wtv9Zuo5eye0DHBJ5X/wAq5nqHEd1dKiSTRiIY/txJsD/OaJLxYsttHH24WQD2gIsZHkGz/NKyw5603Y1q4uJ7gmNCchEScjlXHoRSxN2ekXpMsc9vcdQ4nYfTbet9rxAl1KXVl5yuwds59MdKCcRi8lmWaRGZAu8nLtmonbS8Tg52vF4e3jgmQSDYFg/tEeu29MumXkc8ccoPLzrzcprisR9tCMhq6nwnI19pkbyJmWF+QOB7wouMiONG0YIBFVNRuFt4+blZ87cqj71cwBsOlB+Je07hywc3O8iqN+u9a59McP0GSanaGRhlwQcHYDesUN/o93IWeYGR2YkmKZAv0KmpWesXQS9eBSaPB3aJdwSCBlqcdJi1GZQ9nZdtGoOQZuTJz1APUUt67JZRw3aSQ89xJDF3aQLkLiV+b7Udh4ql0y3W0isizxElJwrEbnceo9K31K5plY36vNLYm2k1TTHhR2Kc/aqRnx+wzQa/15LC5hddOkNvIvNG75XmHn06Vs4g4mXXbGC3vk7J4ZDJzrGwB9kjGD6Gjtvx/pSwRwy2LARqFHQgYHqKXpF+1DtP44gvJ4LQ2TB5WCAiUHGflWeIATqOpEyiJe524Lk48QetGrXi3Qb2eO3jtOWaU4QlF6/zSXx5dtHqFwzRANJDEFzuRhfGqk1EW7oNqV/p7TryiWUoMFy2Qfrmqk2tGMuNPUQA7c2xb6+FCJGLMT515pesHvV9L+ZX7Rn55CD7Unt/zVWWVpDkk1qzUp6LdegT1zWfDrXnNQnNMLEU8kWCjYHpTVoPENz2UsFwslzb4BdMjYfOk8NjFWBMNuzBXwOKjLGVpjloy6vaQxyx31kuLOdsICd0I6qac+BLpuxeDBILK4wem+Komwjtf0/mDxpJI6rKJVcOufQ9Qa38AWzuZLjmHLHygjfck1jWu46J4mhurqGW3DZA7wuMb0Sxg7VS1NeY2oHXtgfsa0y6c+F5VykefZty2PHI/FYq9HCFXAGB8Klc/wD18ae8J3Eun2813qnaRLhUtXXbHL/eIP2Jpn4cEf8ASwI2DKJHAI6e8aReL31Sa+a4NtJbJ3ZWu4+cNygM3LnHXcjpR3hK+l07SriG5tbiRoCHYRpzNuBtgfWuyMnr9RkU6ZZjlALXXUDyRjTJa2lq1rDm2hIMa9Yx5CkPijUl1p4RDYXkcgkREMqcuM8wxjwJ9fKuh2ymO2hVhgiMAg+G1ArS1nYxf3TbQJynPOI1BHzriX6hXGoNrtzFcxqsCtiEoNmQdDnzrsnEsFxc6HeRWbMJ2jPJysFJPlvXzxeyXJlaO6J51OCp8DTCvWVUscCsAZO1XrW1hCdpdSFQegFK3RybVOTGeY4NWIrCQx9pICinoSOtWYltUl9jLjwJpmiit5LPmTPLy7jO1Rlnprh4tk+W2WP/ABq1VyvlRi5SBpDhQAD1JrZbWNpcHlPs5HsshyKcy+lfHu8AXTrW62w8nK7coPjW3VLI2U/ITn1qqgPh1+NVvcRqy6rpfDdpcahwkbSJSxMwXmOygZ6+opu0q1tNKYaXDcgiNAzYO7vuSa18PpaycMaVMiRPboikoVJCnx386OTNGbqJAuGCErXNO61tWoSTEhOMkZOK8TqSYzy5IbK7+hrYmyAdMCoTlh8a1y6kYztjLDbb61K9Fc9RUo0NljiSPtJNYXxOnKfoxotppHfPZ8bWI0B4ivYcanc4Zo5LPsQAN8564+dY03XobbWLlLx2jSCCKPpncqpG1aJEtc0pr/VLXFzJApZWfswM5UOVIPmKvQ6TLEB/4tftj9xTf/8ANAOItZtLyO3k0y8njuYpAcxqV9nB65G//Wiuj65bDTbdb66LXIjAkJQ7t9KDqvxRpd/NpMndb+ZmTLFWYJzDp7wG1cJvopobl0uv9oux3619GJqunzuIlnR2f2QpU758OlcX/UDSLqy12dmw8RjWUdnnljVidseAzQCtEMuBRdbRncMMkYxjFC7UBrmMebU8aTBGsJeQjAHjUZ5abeHGZF9bF40KgEIzZ9rrtTTw9p0VyvYTSFVYdfWqV20DSqzFuQdOVc5ovbXlnbBJIlLhR7o6msrbXT48JKC3vD8sE8kIctGzAlc46VYsdBYumEVeXYHP/Wib38crxyqsysSRIJiDgeGDROzliLqQQRnf0qblWnpj2SeOtONk1sxwe0BpUXIO2K6H+q2cacFHs4O9JOlW1xdX0cFpB2ssh5VGM1vj+XF5ec9uofptOZuFrlJZCWgcKqbgKDuMY8yac4bNVumlLszYxhmJxQ3Q9Gi0/T2gjGObsw3lkYyR9KJWtw0suWOcg71ndb2n7pcrI2IrHTavLtysnq2Psa2umTdWK1F3z7tSjZ6ImslUs5mQn3d8+eaTbC7lv77Urmc80rzbnGMgDA+wFN/EEM0GlzGePsyyHlOfI0l8O2ktzNPHbPzNNMFTDAZJ6/5U9zsQYsIWu9Wt7dr02lsI2knkBGyjyz8qZrbQ7SS7a2g1q/Ldo6DaLHsgFj06AnHzpZOg3c+otpxHa3Ua8zRjkYIPU4r3b8MySahLZQR81zEMyKoX2R6np4ijcPR1tOGuwuoJ11WaTklDBXjTDY9RQXiSE3PEWsQhQVbToEwentSAV40jhi9iurO57IrGjq5OB0zVzVlzxZqeOhsrb/nCmm9ubTWUdtfSIwXnjcgALjYE7j0q5HKwQpnajN1pS3fDhuIAFvGvbmMOSfaAY4FLp7SP2JVKSAYYGsso6MMvi/psM2qXJitY2kZOoDAUbHDOqIdrJhgZOZBj60tWQQz82N/EDY0ZN83Z9nm4KeRfI/morow/1q1FpdKPJdWzqScZRwwq9ojmW3ndDtyjBPgSRWhbiKW0a3eBBk5ywyaK6BatFABjCs2foaSxfiPT7LU4tPtLssSctyJgFhjGPrSHqerf6P3EdtptmkM0S8rOckkg7/fb5Uya7Z3Go8SL2crIkFugUrnY5yennkVL3gWHUSJLjUJefGAVjG3zPU1eM25csuASLjfiGWEF5o4kcjdYxk/zTjwBfd+SXt5jJMgyATnb/vFBF/Tnm5V/q0zRj/C0Y2+FG9N4atNBubcpdXbyTMUBDBRtvuPlRlGf8N4bnAYdCMio6ZcEnPL6UM05buCKOBuxfkj2Ysdxnx2q2735Y9nDbsoPjKQf4qojSx8/tUqm1xfKcGG2z/vm/FSq5Ny+fiaTijOnQryOYyFaXC7ZGenU/ig3f34cuIBG6SSAc6SQsCQQSAT5HbpS8rIp5lDqR0IGMVgtGxyxbPrT0iGfTuNJ9OMxtRIrztzSOQrFj8TWzTuN5dOSRLUSoJWLSNhSzHzyd6Uj2fh/FeSRR6xW3TOHuPpbjULDTf7gjkkWL2kXp8etMN8vNxjqAPTuVt/zRXKuD1X/AEo0vJz/AKyuwrqOrMV4q1TGc9xtyMf7wU0gN3qEGmcMQyXIkZW1W5VQg394mli/vYdQfvNuHC9DzdciiPFPLLwjb+AXWbkZ8veoJp0EiWQLxsI2bKsV2PwNRk0w7WrWWMMOY4IogLi25ffoXb2qyy8rZwautpMPgW+tZ3Tox9l6xuLZpAXO2d6YotTimljigXG4APkKU49OSM5DE/Oiemx9lMr9MGotjab/AKO65xPpOjak9pc9ss3IjNyRZBBG29U14/0Nesl1/wAA0E45j0u91iKebUFtzJAoGYXbpkb4GKqaDwtYarPLBa6yJjGAS6WrBV+JJH2rfGzThy3MqbE/UPQV/wDMu/8AgGteo8eaJO9tJBcTiSCQsBJbtg5BFBLrgW2tgnetfsYlcEqSp3A60MuuHrKxSU22t299IqZ7ONDsMgdfnVeqd026f+oWmpO0l/eNyAFUSG1bocdST/lRRf1K4cBIM91kn/07VymW3VhhgB8KqvCiEBfa+NK4h2Rf1K4XIy11cg+XdX/FSuPx2M8i8yRMR5gVKWp9Iz8Ymy1HVWu9Nh7CFkUFQuOY+LY+n0pdNoCcFj9K6TrHCEslit/w+y3MToHW3lOGII8G/Irnt1LdRc3a2BjIOCC26nyqgqS2qL7zVqEUTMAnMxqSTu5PNET6A1Zt7rssctk5x4/9igDfCWnLFrunzuMcs6kD50/6gmeL74k7dwg2/wDtrnmiao8mvacnYyRjvKZBHrThx/ez6Te6heRkKbizjtom5hnmLMSR8ADVQqUdf1tLGJ9Js0t7h47yW4a5dA4jdj0TO2QP8VCNNu57m4lN1PLM7AHMjlj96EH6mi/D8Qkklz7wAxUZdLw/QvFFiYMD1oiAQozWuK3PKG8a3hCdt65rXbjNMxqBua9PJjcbYr12ZArVPiOPLVLQt61diaVluI+aPHskHdD5j8VoF5NpOmS2UErx3F0yvcFWwUUe6vz6n5V61ZxHKshAJB2XzoO7M7s7kszEkk9TXVhOHn+T9D+laqklq2nX0wRWbmhnkBYRP6+PKfH4CittoV++sd2t3tLgz2jSRyxk9mygjP8AFJXSugfp9xJaaNarYX0W12XK3A3MfQYx5HGdqq7nSO2luHNWfIW1siT0IdhWiHgnXy+VtYJAOv8Aexn7V0mxgkKDA5hjZgwIb1HpVya7GmwGSQZPgvmazmVp3gnxR6/ZRR250C1HIoA/1wDb6VK3XN5cXUzzTF+Zj4HYCpWmhs18HOX4W03mOT2Cj+aV/wBU9B5rL+s2iYMeBcr+4dA3y8fjQbRf1UktLRINRsHnKjHaROqlvlgCmTh/jPT+KVn028tTbduDGiyEFZAQds+dInJrUe2ScdPGiEW5AGPlW/iXhXU+GbgNNJDJayMVhnHj4gEeBqrFN3Lkk1N8q26W0K4dx5sf8I+/p40wv2FskF6moXEscMcDh1Dk5dgdvln4nwAofxXc3sk0aajOZbqQtPLnbGfcGPABR09TQ7+q3Av1vE5FkRsxqV5lT4A+VV7y7nvrl7m7kMkznLMfGjkmmiWjTGG5jYdc4I8xQ2t1nII7hGZiqg7kDNF6Vj26JayISygdd6uYQJnFLtjeWoPad/jfbofZxXq61+BVMfbIAD1G9clxu3fM5INHsyfaIAG/WhGs31tECGfYeA6mgmpa5E4KWcTEkf7WQ/wKBvI0h5nJJ8zWmHiu91j5PPNaj1cTNPKXYnfoPKtdSpXQ5bdpW2eUyFf/AGKFWtVSgjLpWvC5SKx1hmaJdop0dkeP4kdRXrVNPurZmcXNxLAoyr9o5wPAn8g4paGaM6Xr1xYgRSKs9uesbEjHwPgamw2yGC5mjDpdXGD/APMR/nUotDp2k6ineY7hog/VBcCLlPquDv6jb0FSjZ6JVbLeeW3mSaFirqwI+RzWupVJNOvcS3WrNDc3pjkubdP7MYwYlJ6vj92w2OfP0pYld5XZ5WLuxyzE7k17tYZp5ezto2eTBOB5Dqa2XFlNBGJMK0ROA6MD9uvzxQFapUqUBKlSpQEqVKlASpUrIBPhQGKleuSpyUB5qCvXKK9JGDT0GPCsZrc0YxWhxg48aKHsOQNjWK8VKQEe4Rfvf6j8VO4Rfvf6j8VKlAYayjHshnww3361O5R9OZ8HJO/kcVmpQGBYRfuf6j8VnuEX73+o/FSpQE7hF+9/qPxU7hF+9/qPxUqUBO4Rfvf6j8VO4Rfvf6j8VKlATuEX73+o/FZWwiz7z/UfipUpwNosIv3v9vxWGsIs+8/2/FSpTJrewj/e/wBvxWyKxjx7z/b8VKlAbO5x5Ay3Q+X4qoLKNhks+c+n4rNSjIRnuEX73+o/FSpUqTf/2Q=="
                  alt="Rohil portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-900 border-t border-gray-700 text-sm text-gray-300">
              Place your photo in <code className="font-mono">public/me.jpg</code>. For sharper quality, use a higher-res source (800px+).
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300 text-lg">
              Hi! I'm Rohil, a high school student at Olentangy Liberty who is obsessed with building and learning. I love crafting
              clean, useful web experiences and exploring how design and engineering fit together.
            </p>
            <p className="text-gray-300 text-lg">
              I'm especially interested in modern TypeScript/React stacks, product thinking, and shipping small tools that solve
              real problems for friends and classmates. Every project is a chance to learn faster and iterate better.
            </p>
            <p className="text-gray-300 text-lg">
              Outside of coding, you'll usually find me playing volleyball, testing new tech, or hacking on side projects just to see
              what I can make next.
            </p>
            <p className="text-gray-300 text-lg">
              I'm a published blockchain researcher as well.
            </p>
            {session && (
              <div className="mt-4">
                <a
                  href="https://www.linkedin.com/in/rohil-paruchuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition"
                >
                  Connect on LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">🎓 Education</h3>
            <p className="text-gray-300">Olentangy Liberty High School (2024-2028)</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">💻 Expertise</h3>
            <p className="text-gray-300">React, Next.js, TypeScript, Node.js, MongoDB, AWS</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-2">🏐 Passion</h3>
            <p className="text-gray-300">Volleyball, Innovation, Problem-solving</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Skills</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['JavaScript/TypeScript', 'React & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL',
              'AWS & Cloud Deployment', 'UI/UX Design', 'Responsive Design', 'API Development'].map((skill) => (
              <div key={skill} className="bg-gray-800 px-4 py-3 rounded-lg border border-gray-700">
                <p className="text-white">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
