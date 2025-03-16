import React from 'react'
import "./ConfirmLoading.css"

function ConfirmLoading() {
  return (
  
    <div class="hacker-loader">
      <div class="loader-text">
        <span data-text="Initializing..." class="text-glitch">Initializing...</span>
      </div>
      <div class="loader-bar">
        <div class="bar-fill"></div>
        <div class="bar-glitch"></div>
      </div>
      <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
    </div>
    
  )
}

export default ConfirmLoading