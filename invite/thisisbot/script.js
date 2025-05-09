window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('type') === 'r') {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'お手数ですが最初からやり直してください。',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        // URLから ?type=r を消しておく（リロード時に再表示しないように）
        const url = new URL(window.location.href);
        url.searchParams.delete('type');
        window.history.replaceState({}, document.title, url.pathname);
    }
});

function reloadWithFlag() {
    const url = new URL(window.location.href);
    url.searchParams.set('type', 'r');
    window.location.href = url.toString();
}


const steps = ["step1", "step2", "step3", "step4"];
const links = {
  admin: "https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=8&integration_type=0&scope=bot",
  minimal: "https://discord.com/oauth2/authorize?client_id=1240343650664185886&permissions=3263552&integration_type=0&scope=bot"
};
let selectedLink = "";

function startInviteFlow() {
  const intro = document.getElementById('introSection');
  const indicator = document.getElementById('stepIndicator');

  // Hide Intro
  intro.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  intro.style.opacity = "0";
  intro.style.transform = "translateY(-50px)";
  intro.style.maxHeight = "0px";
  intro.style.overflow = "hidden";

  setTimeout(() => {
    intro.classList.add('hidden');
    intro.style = "";

    // Show Step Indicator First
    indicator.classList.remove('hidden');
    indicator.style.opacity = "0";
    indicator.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      indicator.style.opacity = "1";
    }, 50);

    // Show Step1 Properly
    const step1 = document.getElementById('step1');
    step1.classList.remove('hidden');
    step1.style.opacity = "0";
    step1.style.transform = "translateY(50px)";
    step1.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    setTimeout(() => {
      step1.style.opacity = "1";
      step1.style.transform = "translateY(0)";
    }, 50);

    updateStepIndicator(1);

  }, 500);
}

function nextStep(stepNumber) {
  const currentStep = document.querySelector(`#step${stepNumber - 1}`);
  const nextStepElement = document.getElementById(`step${stepNumber}`);
  const indicator = document.getElementById('stepIndicator');

  if (currentStep) {
    // フェードアウト: Step Indicator + コンテンツ
    [currentStep, indicator].forEach(el => {
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease, max-height 0.5s ease";
        el.style.opacity = "0";
        el.style.transform = "translateY(-50px)";
        el.style.maxHeight = "0px";  // 追加 → 高さを縮める
        el.style.overflow = "hidden"; // 追加 → はみ出し防止
        });

    setTimeout(() => {
      currentStep.classList.add('hidden');
      currentStep.style = "";

      // Step Indicatorを先に表示
      indicator.style.opacity = "1";
      indicator.style.transform = "translateY(0)";
      updateStepIndicator(stepNumber);

      // コンテンツは少し遅れて表示
      setTimeout(() => {
        nextStepElement.classList.remove('hidden');
        nextStepElement.style.opacity = "0";
        nextStepElement.style.transform = "translateY(50px)";
        nextStepElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(() => {
          nextStepElement.style.opacity = "1";
          nextStepElement.style.transform = "translateY(0)";
          AOS.refresh();
        }, 50);
      }, 50); // コンテンツはIndicatorの50ms後に出現

    }, 500);
  } else {
    nextStepElement.classList.remove('hidden');
    updateStepIndicator(stepNumber);
  }
}

function confirmMinimal() {
  Swal.fire({
    title: '注意！',
    text: '必要最低限の権限のみでの続行を選択しようとしています。本オプションは一部または全てのコマンドが利用できない可能性があります。その際にお問い合わせを頂きましてもサポートを行うことができません。上記を理解された場合のみ続行ください。',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '理解した上で続行',
    cancelButtonText: 'キャンセル'
  }).then((result) => {
    if (result.isConfirmed) {
      setInviteLink('minimal');
    }
  });
}

function prevStep(stepNumber) {
    const currentStep = document.querySelector(`#step${stepNumber}`);
    const prevStepElement = document.getElementById(`step${stepNumber - 1}`);
    const indicator = document.getElementById('stepIndicator');

    if (currentStep) {
        currentStep.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        currentStep.style.opacity = "0";
        currentStep.style.transform = "translateY(50px)";
        
        setTimeout(() => {
            currentStep.classList.add('hidden');
            currentStep.style = ""; // スタイルリセット

            // 前のステップを復元
            if (prevStepElement) {
                prevStepElement.classList.remove('hidden');
                prevStepElement.style.opacity = "0";
                prevStepElement.style.transform = "translateY(-50px)";
                prevStepElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

                setTimeout(() => {
                    prevStepElement.style.opacity = "1";
                    prevStepElement.style.transform = "translateY(0)";
                }, 50);
            }

            updateStepIndicator(stepNumber - 1);
            AOS.refresh();

        }, 500); // アニメーション完了後に隠す
    }
}

function updateStepIndicator(stepNumber) {
  const indicator = document.getElementById('stepIndicator');
  indicator.textContent = `Step ${stepNumber} of 4`;
}

function setInviteLink(type) {
  selectedLink = links[type];
  document.getElementById("inviteLink").textContent = selectedLink;
  nextStep(4);
}

function copyLink() {
  navigator.clipboard.writeText(selectedLink).then(() => {
    const copyBtn = document.getElementById("copyLinkBtn");
    copyBtn.textContent = "コピーしました！";
    copyBtn.classList.remove('bg-cyan-600', 'hover:bg-cyan-500');
    copyBtn.classList.add('bg-green-500', 'hover:bg-green-400');

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'リンクをコピーしました！',
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() => {
      copyBtn.textContent = "リンクをコピー";
      copyBtn.classList.remove('bg-green-500', 'hover:bg-green-400');
      copyBtn.classList.add('bg-cyan-600', 'hover:bg-cyan-500');
    }, 2000);
  });
}

function redirectLink() {
  if (selectedLink) {
    window.open(selectedLink, "_blank");
  }
}

AOS.init({
  once: true,
  duration: 800,
  easing: 'ease-in-out'
});
