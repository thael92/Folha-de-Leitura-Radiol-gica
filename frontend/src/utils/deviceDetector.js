export class DeviceDetector {
    static isIPad() {
        return /iPad/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }

    static isMacBook() {
        return /MacIntel/.test(navigator.platform) && navigator.maxTouchPoints <= 1;
    }

    static getDeviceType() {
        if (this.isIPad()) {
            const width = window.innerWidth;
            if (width >= 1024) return 'ipad-pro';
            return 'ipad';
        }
        
        if (this.isMacBook()) {
            const width = window.innerWidth;
            if (width >= 1440) return 'macbook-pro';
            return 'macbook-air';
        }
        
        return 'other';
    }

    static getDeviceSpecs() {
        const deviceType = this.getDeviceType();
        const specs = {
            'ipad-pro': {
                zoom: 1,
                fontSize: '16px',
                padding: '24px',
                maxWidth: '1024px'
            },
            'ipad': {
                zoom: 0.9,
                fontSize: '15px',
                padding: '20px',
                maxWidth: '820px'
            },
            'macbook-pro': {
                zoom: 1.1,
                top: '50%',
                fontSize: '16px',
                padding: '30px',
                maxWidth: '1400px'
            },
            'macbook-air': {
                zoom: 1,
                fontSize: '16px',
                padding: '24px',
                maxWidth: '1200px'
            },
            'other': {
                zoom: 1,
                fontSize: '16px',
                padding: '20px',
                maxWidth: '100%'
            }
        };
        
        return specs[deviceType];
    }
} 